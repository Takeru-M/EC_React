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

  public function fetchCarts($params)
  {
    $response = $this->cartRepo->fetchCarts($params);
    $carts = $response['data'];

    $data['data'] = $carts->map(function ($cart) {
      return [
        'id' => $cart->id,
        'quantity' => $cart->quantity,
        'created_at' => $cart->created_at,
        'updated_at' => $cart->updated_at,
        'product' => [
          'id' => $cart->product->id,
          'name' => $cart->product->name,
          'price' => $cart->product->price,
          'stock' => $cart->product->stock,
          'image' => $cart->product->image,
        ],
        'total_price' => $cart->product->price * $cart->quantity
      ];
    });

    $data['total'] = $response['total'];
    $data['per_page'] = $response['per_page'];
    $data['current_page'] = $response['current_page'];

    return $data;
  }
}
