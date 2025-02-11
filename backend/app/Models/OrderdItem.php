<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderdItem extends Model
{
  protected $fillable = [
    'price',
    'quantity',
    'status'
  ];

  protected $hidden = [
    'id',
    'product_id',
    'order_id'
  ];

  public function orders(): BelongsTo
  {
    return $this->belongsTo(Order::class);
  }

  public function products() :BelongsTo
  {
    return $this->belongsTo(Product::class);
  }
}
