<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use \App\Profession,
	\App\Doctor,
	\App\Record;

use Cache;

use Illuminate\Http\Request;

class RecordController extends Controller {

	/**
	 * Время в минутах для кеширования запросов из базы
	 */
	const REMEMBER = 5;
	
	/**
	 * Отображает врачей, календарь и записи на приём
	 *
	 * @return Response
	 */
	public function index()
	{
		$professions = Cache::remember('doctors', self::REMEMBER, function() {
			return Profession::with('doctors')->orderBy('name', 'asc')->get();
		});
		
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
		$records = Cache::remember('doctor'.$request->id, self::REMEMBER, function() use ($request) {
			return Doctor::find($request->id)->records()
					->where("time_of_reception", ">", "{$request->date} 00:00:00")
					->where("time_of_reception", "<", "{$request->date} 23:59:59")
					->get();
		});
		
		//Пересоберём записи с ключами-часами
		$formatRecords = [];
		foreach ($records as &$record)
		{
			$record['hour'] = date('H', strtotime($record['time_of_reception']));
			$formatRecords[(int) $record['hour']] = $record;
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
				'doctor_id' => 'required|numeric',
				'time_of_reception' => 'required|date',
			],
			[
				'required' => 'Необходимо указать :attribute.',
			]
		);
		
		//Добавляем запись
		$record = new Record();
		$record->doctor_id = $request->doctor_id;
		$record->name = $request->name;
		$record->phone = $request->phone;
		$record->confirmed = true;
		$record->time_of_reception = $request->time_of_reception;
		$record->save();
	}

}
