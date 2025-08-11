<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'venue',
        'city',
        'country',
        'event_date',
        'image_url',
        'price',
        'total_tickets',
        'available_tickets',
        'is_active',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'price' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }

    public function availableTickets(): HasMany
    {
        return $this->tickets()->where('status', 'available');
    }
}
