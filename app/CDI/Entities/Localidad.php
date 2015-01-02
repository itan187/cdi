<?php namespace CDI\Entities;	
	
class Localidad extends \Eloquent
{
	protected $table = 'localidades';
	
	protected $fillable = array('id', 'nombre');

	public $incrementing = false;


	public function municipios()
	{
		return $this->belongsToMany('Municipio','localidade_municipio','localidade_id','municipio_id');	
	}
}

?>