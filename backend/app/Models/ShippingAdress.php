<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShippingAdress extends Model
{
    protected $fillable = [
      'postal_code',
      'address',
      'phone_number',
      'name'
    ];

    protected $hidden = [
      'id',
      'user_id',
    ];

    public function users(): BelongsTo
    {
      return $this->belongsTo(User::class);
    }
}
