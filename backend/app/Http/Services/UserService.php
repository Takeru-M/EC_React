<?php

declare(strict_types=1);

namespace App\Http\Services;

use App\Http\Repositories\UserRepository;

class UserService
{
  private $userRepo;

  public function __construct(UserRepository $userRepo)
  {
    $this->userRepo = $userRepo;
  }

  public function getList($params)
  {
    return $this->userRepo->getList($params);
  }

  public function create($params)
  {
    return $this->userRepo->create($params);
  }

  public function getDetailUser($id)
  {
    $data = $this->userRepo->getDetailUser($id);
    return [
      'id' => $data->id,
      'first_name' => $data->first_name,
      'last_name' => $data->last_name,
      'first_name_kana' => $data->first_name_kana,
      'last_name_kana' => $data->last_name_kana,
      'email' => $data->email,
      'phone_number' => $data->phone_number,
      'postal_code' => $data->postal_code,
      'address' => $data->address,
    ];
  }

  public function update($params, $id)
  {
    return $this->userRepo->update($params, $id);
  }

  public function delete($id)
  {
    return $this->userRepo->delete($id);
  }
}
