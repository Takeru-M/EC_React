<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\ReviewService;
use App\Models\Review;

class ReviewController extends Controller
{
    private $reviewService;

    public function __construct(ReviewService $reviewService)
    {
        $this->reviewService = $reviewService;
    }

  /**
   * Display a listing of the resource.
     */
    public function index(Request $request)
    {
      //
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
      $data = $this->reviewService->create($params);
      return response()->json(['data' => $data], 200);
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
      //
    }

    public function getList(Request $request)
    {
      $product_id = $request->input('product_id');
      $data = $this->reviewService->getList($product_id);
      return response()->json(['data' => $data], 200);
    }

    public function getReviewsWithUserNames(Request $request)
    {
      $product_id = $request->input('product_id');
      $data = $this->reviewService->getReviewsWithUserNames($product_id);
      return response()->json(['data' => $data], 200);
    }
}
