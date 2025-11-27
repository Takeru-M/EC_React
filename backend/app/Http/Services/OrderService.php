<?php

declare(strict_types=1);

namespace App\Http\Services;

use App\Http\Repositories\OrderRepository;

class OrderService
{
  private $orderRepo;

  public function __construct(OrderRepository $orderRepo)
  {
    $this->orderRepo = $orderRepo;
  }

  public function create($params)
  {
    return $this->orderRepo->create($params);
  }

  public function createOrderedItems($params)
  {
    return $this->orderRepo->createOrderedItems($params);
  }
}
