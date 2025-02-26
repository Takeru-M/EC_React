<?php

declare(strict_types=1);

namespace App\Http\Services;

use App\Http\Repositories\ShippingAddressRepository;

class ShippingAddressService
{
  private $shippingAddressRepo;

  public function __construct(ShippingAddressRepository $shippingAddressRepo)
  {
    $this->shippingAddressRepo = $shippingAddressRepo;
  }

  public function fetchAddresses($params)
  {
    return $this->shippingAddressRepo->fetchAddresses($params);
  }

  public function createAddress($params)
  {
    return $this->shippingAddressRepo->createAddress($params);
  }

  public function updateAddress($params)
  {
    return $this->shippingAddressRepo->updateAddress($params);
  }

  public function deleteAddress($params)
  {
    return $this->shippingAddressRepo->deleteAddress($params);
  }

  public function switchDefaultAddress($params)
  {
    try {
      return $this->shippingAddressRepo->switchDefaultAddress($params);
    } catch (\Exception $e) {
      throw new \Exception('Failed to switch default address: ' . $e->getMessage());
    }
  }
}
