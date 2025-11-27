<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class OrderShipped extends Mailable
{
  use Queueable, SerializesModels;

  public array $order;
  public array $order_item;

  /**
   * Create a new message instance.
   */
  public function __construct($request)
  {
    $this->order = $request->order;
    $this->order_item = $request->order_item;
  }

  /**
   * Get the message envelope.
   */
  public function envelope(): Envelope
  {
    return new Envelope(
      from: new Address('noreply@example.com', 'Example Shop'),
      subject: 'Your Order Has Been Shipped',
    );
  }

  /**
   * Get the message content definition.
   */
  public function content(): Content
  {
    return new Content(
      view: 'emails.orders.shipped',
      with: [
        'order' => $this->order,
        'order_item' => $this->order_item,
      ],
    );
  }

  /**
   * Build the message.
   */
  public function build()
  {
    return $this->from('noreply@example.com', 'Example Shop')
      ->subject('Your Order Has Been Shipped')
      ->view('emails.orders.shipped')
      ->with([
        'order' => $this->order,
        'order_item' => $this->order_item,
      ]);
  }
}
