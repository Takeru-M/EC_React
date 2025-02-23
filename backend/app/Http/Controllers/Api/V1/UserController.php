<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\UserService;
use App\Http\Requests\UserSearchRequest;
use App\Http\Requests\UserPostRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  protected $userService;

  public function __construct(UserService $userService)
  {
    $this->userService = $userService;
  }

    public function index(UserSearchRequest $request)
    {
        $data = $this->userService->getList($request->all());
        return response()->json(['data' => $data], 200);
    }

    public function store(UserPostRequest $request)
    {
        $params = $request->all();
        $data = $this->userService->create($params);
        // ユーザのデータとアクセストークンを返す
        return response()->json(['data' => $data, 'access_token' => $data->createToken('auth_token')->plainTextToken]);
    }

    public function show($id)
    {
        //
    }

    public function update(UserPostRequest $request, User $user)
    {
        $params = $request->all();
        $data = $this->userService->update($user, $params);
        return response()->json(['data' => $data], 200);
    }

    public function destroy($id)
    {
        $data = $this->userService->delete($id);
        return response()->json(['data' => $data], 200);
    }

    public function updatePassword(User $user, Request $request)
    {
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        } else if (Hash::check($request->new_password, $user->password)) {
            return response()->json(['message' => 'New password and current password cannot be the same'], 400);
        }

        $params = $request->only('new_password');
        $params['new_password'] = Hash::make($params['new_password']);
        $this->userService->updatePassword($user, $params);
        return response()->noContent(200);
    }
}
