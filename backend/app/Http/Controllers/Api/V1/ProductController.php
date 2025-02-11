<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\ProductService;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
  protected $productService;

  public function __construct(ProductService $productService)
  {
    $this->productService = $productService;
  }

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    // $data = $this->productService->getList();
    // return response()->json(['data' => $data], 200);
    try {
      $products = Product::with(['category_item.category'])
        ->where('exist', true)
        ->orderBy('created_at', 'desc')
        ->get();

      return response()->json([
        'data' => $products
      ], 200);
    } catch (\Exception $e) {
      Log::error('Product index error: ' . $e->getMessage());
      return response()->json([
        'error' => 'Failed to fetch products'
      ], 500);
    }
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
    //
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
  public function destroy(string $id)
  {
    //
  }
}
