<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\OrderedItem;

class Order extends Model
{
    protected $fillable = [
      'user_id',
      'guest_id',
      'name',
      'address',
      'postal_code',
      'email',
      'phone_number',
      'shipping_fee',
      'total_price',
      'payment_method',
      'status',
    ];

    protected $hidden = [
      'id',
    ];

    public function users(): BelongsTo
    {
      return $this->belongsTo(User::class);
    }

    public function ordereditems(): HasMany
    {
      return $this->hasMany(OrderedItem::class);
    }
}
