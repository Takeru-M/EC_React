<?php

declare(strict_types=1);

namespace App\Http\Repositories;

use App\Models\User;

class UserRepository
{
  public function getAllUsers()
  {
      return User::all();
  }

  public function getList($params)
  {
      $query = User::query()->withTrashed()->filter($params);
      return $query->get();
  }

  public function create($params)
  {
      return User::create($params);
  }

  public function getDetailUser($id)
  {
      return User::where('id', $id)->first();
  }

  public function update($params, $id)
  {
      $data = User::where('id', $id)->first();
      $data->update($params);
      return $data;
  }

  public function delete($id)
  {
      $data = User::where('id', $id)->first();
      $data->delete();
      return $data;
  }
}
