<?php

declare(strict_types=1);

namespace App\Http\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

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

  public function update($user, $params)
  {
      $data = $user;

      $data->fill([
          'login_name' => $params['login_name'] ?? $data->login_name,
          'first_name' => $params['first_name'] ?? $data->first_name,
          'last_name' => $params['last_name'] ?? $data->last_name,
          'first_name_kana' => $params['first_name_kana'] ?? $data->first_name_kana,
          'last_name_kana' => $params['last_name_kana'] ?? $user->last_name_kana,
          'email' => $params['email'] ?? $data->email,
          'phone_number' => $params['phone_number'] ?? $data->phone_number,
          'postal_code' => $params['postal_code'] ?? $data->postal_code,
          'address' => $params['address'] ?? $data->address,
      ]);

      if ($data->isDirty()) {
          $data->save();
      }

      return $data;
  }

  public function delete($id)
  {
      $data = User::where('id', $id)->first();
      $data->delete();
      return $data;
  }

  public function updatePassword($user, $params)
  {
      $data = $user;
      $data->password = $params['new_password'];
      $data->save();
      return null;
  }
}
