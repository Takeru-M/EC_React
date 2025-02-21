<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\UserService;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

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

    if (Auth::attempt($credentials)) {
      // $request->session()->invalidate();
      $request->session()->regenerate();

      return response()->json(['data' => $data], 200);
    }

    //エラー処理
  }

  public function signout(Request $request)
  {
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->noContent();
  }

  public function fetchUser(Request $request)
  {
    $data = $request->user();
    return response()->json(['data' => $data], 200);
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
