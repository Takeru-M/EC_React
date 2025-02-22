<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\ProductService;
use App\Models\Product;
use Illuminate\Support\Facades\Log;
use App\Helpers\ErrorMessages;

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
      $data = $this->productService->getList();

      if (!$data) {
        return response()->json(['error' => ErrorMessages::notFound('Product')], 404);
      }

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
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
      $data = $this->productService->getDetailProduct($id);

      if (!$data) {
        return response()->json(['error' => ErrorMessages::notFound('Product')], 404);
      }

      return response()->json(['data' => $data], 200);
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

  public function getPagination(Request $request)
  {
    $params = $request->all();
    $data = $this->productService->getPagination($params);

    return response()->json(['data' => $data, 'total' => $data['total'], 'per_page' => $data['per_page'], 'current_page' => $data['current_page']], 200);
  }

  public function searchProducts(Request $request)
  {
    $tmp_data = $this->productService->searchProducts($request);
    // return response()->json(['data' => $data['data'], 'total' => $data['total'], 'per_page' => $data['per_page'], 'current_page' => $data['current_page']], 200);
    $response = response()->json($tmp_data);
    $data = $response->getOriginalContent();
    return response()->json(['data' => $data], 200);
  }
}
