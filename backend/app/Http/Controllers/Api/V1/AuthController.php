<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\UserService;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Str;
use App\Models\GuestUser;

class AuthController extends Controller
{
  protected $userService;

  public function __construct(UserService $userService)
  {
    $this->userService = $userService;
  }

  public function signup(Request $request)
  {
      $requestForCreate = $request->all();
      $requestForCreate['password'] = Hash::make($requestForCreate['password']);
      $data = User::create($requestForCreate);

      $credentials = $request->only(['email', 'password']);
      if (Auth::attempt($credentials)) {
          $request->session()->regenerate();

          return response()->json(['data' => $data], 200);
      }

      //エラー処理
      // throw new AuthenticationException();
  }

  public function signin(Request $request)
  {
    $credentials = $request->only(['email', 'password']);

    $data = User::where('email', $credentials['email'])->first();

    try {
      if (Auth::attempt($credentials)) {
        // $request->session()->invalidate();
        $request->session()->regenerate();

        return response()->json(['data' => $data], 200);
      }
      return throw new \Exception('User not authenticated');
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 401);
    }
  }

  public function signout(Request $request)
  {
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->noContent();
  }

  public function createGuestUser(Request $request)
  {
    // もしクッキーにguest_idがあればそれを使用する
    $guestId = $request->cookie('guest_id');
    if ($guestId) {
      return response()->json(['data' => $guestId], 200);
    }

    $guest = GuestUser::create();

    // クッキーにguest_idを設定する
    $response = response()->json(['data' => $guest], 201);
    $response->cookie('guest_id', $guest->id, 60 * 24 * 30); // 30日間有効

    return $response;
  }

  public function fetchUser(Request $request)
  {
    try {
      $data = $request->user();
      if (!$data) {
        throw new \Exception('User not authenticated');
      }
      return response()->json(['data' => $data], 200);
    } catch (\Exception $e) {
      return response()->json(['message' => 'User not found'], 401);
    }
  }

  public function loginForStaff(Request $request)
  {
    $credentials = $request->validate([
      'email' => 'required|email',
      'password' => 'required|min:6',
  ]);

  if (Auth::guard('staff')->attempt($credentials)) {
      /** @var Staff $staff */
      $staff = Auth::guard('staff')->user();
      $token = $staff->createToken('StaffAccessToken')->plainTextToken;
      return response()->json(['staff' => $staff, 'access_token' => $token], 200);
  }

  return response()->json(['message' => '認証に失敗しました'], 401);
  }
}
