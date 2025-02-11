<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Order extends Model
{
    protected $fillable = [
      'name',
      'address',
      'porstal_code',
      'phone_number',
      'shipping_fee',
      'total_price',
      'payment_method',
      'status',
    ];

    protected $hidden = [
      'id',
      'user_id'
    ];

    public function users(): BelongsTo
    {
      return $this->belongsTo(User::class);
    }

    public function ordereditems(): HasMany
    {
      return $this->hasMany(OrderdItem::class);
    }
}
