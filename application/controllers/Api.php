<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST");
header("Access-Control-Allow-Headers:*");

class Api extends CI_Controller{
	public $CI = NULL;
	function __construct(){
		parent::__construct();
		$this->load->model('Admin_model');
		$this->CI = & get_instance();
	}
	
	public function react_post()
	{
		$post_got = file_get_contents("php://input");
		$data_got = json_decode($post_got);
		$data = array(
			'name' => $data_got->name,
			'contact' => $data_got->contact,
			'email' => $data_got->email,
		);
		$this->Api_model->create('react_customer',$data);
    }
    public function insert($tablename){
        echo $tablename; exit;
        $post_got = file_get_contents("php://input");
		$data_got = json_decode($post_got);
        $columns = $this->Admin_model->table($tablename);
        for($i=0;$i<count($columns);$i++)
        {
            if($columns[$i]!="id")
            {
               if($columns[$i]=="date_created") {
                    $date = date('Y-m-d');
                    $data[$columns[$i]] = $date;
                } else {
                    $data[$columns[$i]] = $data_got->$columns[$i];
                }
            }
        }
        $insert = $this->Admin_model->create($tablename,$data);
    }
    
}
?>