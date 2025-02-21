<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\UserService;
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

    public function update(UserPostRequest $request, $id)
    {
        $params = $request->only('name', 'email', 'password');
        $data = $this->userService->update($params, $id);
        return response()->json(['data' => $data], 200);
    }

    public function destroy($id)
    {
        $data = $this->userService->delete($id);
        return response()->json(['data' => $data], 200);
    }
}
