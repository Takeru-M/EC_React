<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Services\UserService;
use App\Http\Requests\UserSearchRequest;
use App\Http\Requests\UserPostRequest;

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
        return response()->json($data);
    }

    public function store(UserPostRequest $request)
    {
        $params = $request->only('name', 'email', 'password');
        $data = $this->userService->create($params);
        // ユーザのデータとアクセストークンを返す
        return response()->json(['user' => $data, 'accessToken' => $data->createToken('auth_token')->plainTextToken]);
    }

    public function show($id)
    {
        $data = $this->userService->getDetailUser($id);
        return response()->json($data);
    }

    public function update(UserPostRequest $request, $id)
    {
        $params = $request->only('name', 'email', 'password');
        $data = $this->userService->update($params, $id);
        return response()->json($data);
    }

    public function destroy($id)
    {
        $data = $this->userService->delete($id);
        return response()->json($data);
    }
}
