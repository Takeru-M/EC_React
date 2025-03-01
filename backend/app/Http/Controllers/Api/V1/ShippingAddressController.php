<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Services\ShippingAddressService;

class ShippingAddressController extends Controller
{
    protected $shippingAddressService;

    public function __construct(ShippingAddressService $shippingAddressService)
    {
        $this->shippingAddressService = $shippingAddressService;
    }

    public function fetchAddresses(Request $request)
    {
        $params = $request->only('id');
        $data = $this->shippingAddressService->fetchAddresses($params);
        return response()->json(['data' => $data], 200);
    }

    public function createAddress(Request $request)
    {
        $params = $request->all();
        $data = $this->shippingAddressService->createAddress($params);
        return response()->json(['data' => $data], 201);
    }

    public function updateAddress(Request $request)
    {
        $params = $request->all();
        $data = $this->shippingAddressService->updateAddress($params);
        return response()->json(['data' => $data], 200);
    }

    public function deleteAddress(Request $request)
    {
        $params = $request->all();
        $data = $this->shippingAddressService->deleteAddress($params);
        return response()->json(['data' => $data], 200);
    }

    public function switchDefaultAddress(Request $request)
    {
        $params = $request->all();
        try {
            $data = $this->shippingAddressService->switchDefaultAddress($params);
            return response()->json(['data' => $data], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
