<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Profession extends Model {

	public function doctors()
	{
		return $this->hasMany(Doctor::class);
	}

}
