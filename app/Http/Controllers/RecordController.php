<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class RecordController extends Controller {

	/**
	 * Отображает врачей, календарь и записи на приём
	 *
	 * @return Response
	 */
	public function index()
	{
		$professions = \App\Profession::with('doctors')->orderBy('name', 'asc')->get();
		
		return view('records.records', [
			'professions' => $professions
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

}
