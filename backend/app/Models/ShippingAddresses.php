<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShippingAddress extends Model
{

    protected $table = 'shipping_address';

    protected $fillable = [
      'id',
      'user_id',
      'name',
      'postal_code',
      'address',
      'country',
      'phone_number',
      'is_default'
    ];

    public function users(): BelongsTo
    {
      return $this->belongsTo(User::class);
    }
}
