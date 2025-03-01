<?php

declare(strict_types=1);

namespace App\Http\Repositories;

use App\Models\ShippingAddress;

class ShippingAddressRepository
{
  public function fetchAddresses($params)
  {
    return ShippingAddress::where('user_id', $params['id'])->get();
  }

  public function createAddress($params)
  {
    return ShippingAddress::create($params);
  }

  public function updateAddress($params)
  {
      try {
        $data = ShippingAddress::where('id', $params['id'])->first();
        $data->fill([
          'name' => $params['name'],
        'postal_code' => $params['postal_code'],
        'address' => $params['address'],
        'country' => $params['country'],
        'phone_number' => $params['phone_number'],
        'is_default' => $params['is_default'],
      ]);
      $data->save();
      return $data->refresh();
    } catch (\Exception $e) {
      throw new \Exception('Failed to update address: ' . $e->getMessage());
    }
  }

  public function deleteAddress($params)
  {
    $data = ShippingAddress::where('id', $params['id'])->first();
    $data->delete();
    return $data;
  }

  public function switchDefaultAddress($params)
  {
    $data = ShippingAddress::where('id', $params['id'])->first();
    $data->is_default = $params['is_default'];
    $data->save();
    return $data->refresh();
  }
}
