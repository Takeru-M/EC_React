<?php

declare(strict_types=1);

namespace App\Repositories;

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
    return User::where('id', $id)->update($params);
  }

  public function delete($id)
  {
    return User::where('id', $id)->delete();
  }
}
