<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\UserRepository;

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
    return $this->userRepo->getDetailUser($id);
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
