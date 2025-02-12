<?php

declare(strict_types=1);

namespace App\Http\Services;

use App\Http\Repositories\CartRepository;

class CartService
{
  private $cartRepo;

  public function __construct(CartRepository $cartRepo)
  {
    $this->cartRepo = $cartRepo;
  }

  public function getList($user_id)
  {
    return $this->cartRepo->getList($user_id);
  }

  public function create($params)
  {
    return $this->cartRepo->create($params);
  }

  public function getDetailUser($id)
  {
    return $this->cartRepo->getDetailCart($id);
  }

  public function delete($params)
  {
    return $this->cartRepo->delete($params);
  }
}
