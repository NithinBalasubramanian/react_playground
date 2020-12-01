<?php
class Api extends CI_Controller{
	public $CI = NULL;
	function __construct(){
		parent::__construct();
		$this->load->model('Admin_model');
		$this->CI = & get_instance();
	}
	
	

}