<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\CartService;
use Illuminate\Support\Facades\Cookie;

class CartController extends Controller
{
    private $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

  /**
   * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user_id = $request->user_id;
        $data = $this->cartService->getList($user_id);

        return response()->json(['data' => $data], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $params = $request->all();
        $data = $this->cartService->create($params);

        return response()->json(['data' => $data], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $params = $request->all();
        $data = $this->cartService->update($id, $params);
        return response()->json(['data' => $data], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($cart_id)
    {
        $data = $this->cartService->delete($cart_id);

        return response()->json(['data' => $data], 200);
    }

    public function fetchCarts(Request $request)
    {
        $params = $request->all();
        $data = $this->cartService->fetchCarts($params);
        return response()->json(['data' => $data['data'], 'total' => $data['total'], 'per_page' => $data['per_page'], 'current_page' => $data['current_page']], 200);
    }

    public function fetchCartsForGuest(Request $request)
    {
        $id = $request->cookie('guest_id');
        $params = $request->all();
        $params['guest_id'] = $id;
        $data = $this->cartService->fetchCartsForGuest($params);
        return response()->json(['data' => $data['data'], 'total' => $data['total'], 'per_page' => $data['per_page'], 'current_page' => $data['current_page']], 200);
    }

    public function storeForGuest(Request $request)
    {
        $id = $request->cookie('guest_id');
        $params = $request->all();
        $params['guest_id'] = $id;
        $data = $this->cartService->createForGuest($params);
        return response()->json(['data' => $data], 201);
    }

    public function integrateCart(Request $request)
    {
      try {
        $id = $request->cookie('guest_id');
        $params = $request->all();
        $params['guest_id'] = $id;
        $this->cartService->integrateCart($params);
        return response()->noContent(200)->withCookie(Cookie::forget('guest_id'));
      } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);
      }
    }
}
