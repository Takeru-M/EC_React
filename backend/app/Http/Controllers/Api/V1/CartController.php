<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\CartService;

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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($params)
    {
        $data = $this->cartService->delete($params);

        return response()->json(['data' => $data], 200);
    }

    public function getCarts(Request $request)
    {
        $user_id = $request->input('user_id');
        $data = $this->cartService->getCarts($user_id);

        return response()->json(['data' => $data], 200);
    }
}
