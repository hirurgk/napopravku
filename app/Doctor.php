<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model {

	public function profession()
	{
		return $this->belongsTo(Profession::class);
	}
	
	public function records()
	{
		return $this->hasMany(Record::class);
	}

}
