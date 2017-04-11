<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use \App\Profession,
	\App\Doctor,
	\App\Record;

use Illuminate\Http\Request;

class RecordController extends Controller {

	/**
	 * Отображает врачей, календарь и записи на приём
	 *
	 * @return Response
	 */
	public function index()
	{
		$professions = Profession::with('doctors')->orderBy('name', 'asc')->get();
		
		return view('records.records', [
			'professions' => $professions
		]);
	}
	
	/**
	 * Выводит таблицу записи к врачу
	 * 
	 * @return Response
	 */
	public function getList(Request $request)
	{
		$records = Doctor::find($request->id)->records()
			->where("time_of_reception", ">", "{$request->date} 00:00:00")
			->where("time_of_reception", "<", "{$request->date} 23:59:59")
			->get();
		
		//Пересоберём записи с ключами-часами
		$formatRecords = [];
		foreach ($records as &$record)
		{
			$record['hour'] = date('H', strtotime($record['time_of_reception']));
			$formatRecords[$record['hour']] = $record;
		}
		
		return view('records.list', [
			'records' => collect($formatRecords)
		]);
	}

	/**
	 * Запись пациента к врачу
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		$this->validate(
			$request,
			[
				'name' => 'required|max:255',
				'phone' => 'required',
			],
			[
				'required' => 'Необходимо указать :attribute.',
			]
		);
	}

}
