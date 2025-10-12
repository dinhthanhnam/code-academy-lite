<?php

namespace App\Models;
class Option
{
    public $value;
    public $label;

    public function __construct($value, $label)
    {
        $this->value = $value;
        $this->label = $label;
    }
}
