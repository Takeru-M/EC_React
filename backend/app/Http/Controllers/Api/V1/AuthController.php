<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\UserService;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  protected $userService;

  public function __construct(UserService $userService)
  {
    $this->userService = $userService;
  }

    public function login(Request $request)
    {
        $credentials = $request->validate([
          'email' => 'required|email',
          'password' => 'required|min:6',
        ]);
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if ($user) {
              $token = $user->createToken('AccessToken')->plainTextToken;
              return response()->json(['user' => $user, 'access_token' => $token], 200);
            }
        } else {
            return response()->json(401);
        }
    }

    public function signin(Request $request)
    {
        $params = $request->validate([
          'name' => 'required|string|max:255',
          'email' => 'required|email|unique:email',
          'password' => 'required|min:6',
        ]);
        $params['password'] = Hash::make($params['password']);
        $data = $this->userService->create($params);
        $token = $data->createToken('AccessToken')->plainTextToken;
        return response()->json(['user' => $data, 'access_token' => $token], 200);
    }

    public function loginForStaff(Request $request)
    {
        $credentials = $request->validate([
          'login_id' => 'required|number',
          'password' => 'required|min:6',
        ]);
        if (Auth::attempt($credentials)) {
            $staff = Auth::user();
            // $staff = Auth::guard('staff')->user();
            $token = $staff->createToken('AccessToken')->plainTextToken;
            return response()->json(['staff' => $staff, 'access_token' => $token], 200);
        } else {
            return response()->json(401);
        }
    }
}
