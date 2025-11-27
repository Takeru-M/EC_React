<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Services\OrderService;
use Illuminate\Http\Request;
use App\Mail\OrderShipped;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
      $this->orderService = $orderService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
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
        // $params = $request->only('address', 'shipping_fee', 'total_price', 'status');
        // $user = $params['user'];
        // $guest = $params['guest'];
        // if ($user) {
        //   $params['user_id'] = $user->id;
        //   $params['name'] = $user->first_name . $user->last_name;
        //   $params['postal_code'] = $user->postal_code;
        //   $params['email'] = $user->email;
        //   $params['phone_number'] = $user->phone_number;
        // } else if ($guest) {
        //   $params['guest_id'] = $guest->id;
        //   $params['name'] = $guest->name;
        //   $params['postal_code'] = $guest->postal_code;
        //   $params['email'] = $guest->email;
        //   $params['phone_number'] = $guest->phone_number;
        // }

        // $data = $this->orderService->create($params);

        // return response()->json(['data' => $data], 201);
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

    public function handleOrder(Request $request)
    {
      DB::beginTransaction();

      try {
        $order = $request->only('order');
        $paramsForOrder['address'] = $order['address'];
        $paramsForOrder['shipping_fee'] = $order['shipping_fee'];
        $paramsForOrder['total_price'] = $order['total_price'];
        $paramsForOrder['status'] = $order['status'];
        $user = $order['user'];
        $guest = $order['guest'];
        if ($user) {
          $paramsForOrder['user_id'] = $user->id;
          $paramsForOrder['name'] = $user->first_name . $user->last_name;
          $paramsForOrder['postal_code'] = $user->postal_code;
          $paramsForOrder['email'] = $user->email;
          $paramsForOrder['phone_number'] = $user->phone_number;
        } else if ($guest) {
          $paramsForOrder['guest_id'] = $guest->id;
          $paramsForOrder['name'] = $guest->name;
          $paramsForOrder['postal_code'] = $guest->postal_code;
          $paramsForOrder['email'] = $guest->email;
          $paramsForOrder['phone_number'] = $guest->phone_number;
        }
        $dataForOrder = $this->orderService->create($paramsForOrder);

        $paramsForOrderedItems = $request->only('orderedItems');
        $dataForOrderedItems = $this->orderService->createOrderedItems($paramsForOrderedItems);

        DB::commit();

        //TODO: メール送信

        return response()->json(['message' => 'Create the order successfully.', 'data' => true], 201);
      } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['message' => 'System error has occurred.', 'error' => $e->getMessage()], 500);
      }
    }

    // public function createOrderedItems(Request $request)
    // {
    //     $params = $request->all();
    //     $data = $this->orderService->createOrderedItems($params);

    //     if ($data) {
    //       return response()->json(['message' => '注文商品が正常に登録されました。'], 201);
    //     } else {
    //       return response()->json(['message' => '注文商品の登録に失敗しました。'], 500);
    //     }
    // }

    // public function sendOrderShippedMail(Request $request)
    // {
    //     $email = $request->email;
    //     Mail::to($email)->send(new OrderShipped($request->all()));

    //     return response()->json(['message' => 'Order confirmation email sent.']);
    // }
}
