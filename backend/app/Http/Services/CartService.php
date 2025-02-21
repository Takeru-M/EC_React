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

  public function delete($cart_id)
  {
    return $this->cartRepo->delete($cart_id);
  }

  public function getCarts($user_id)
  {
    return $this->cartRepo->getCarts($user_id);
  }
}
