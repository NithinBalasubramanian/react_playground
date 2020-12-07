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
        $post_got = file_get_contents("php://input");
        $data_got = json_decode($post_got);
        $columns = $this->Admin_model->table($tablename);
        $data = array();
        for($i=0;$i<count($columns);$i++)
        {
            if($columns[$i]!="id")
            {
               if($columns[$i]=="date") {
                    $date = date('Y-m-d');
                    $data[$columns[$i]] = $date;
                } else {
                    $fetch = $columns[$i];
                    $data[$columns[$i]] = $data_got->$fetch;
                }
            }
        }
        $insert = $this->Admin_model->create($tablename,$data);
    }

    public function fetch_data($tablename)
    {
        $data = $this->Admin_model->table_column($tablename,'status','1');
        echo json_encode($data);
    }
    
    public function del_data($tablename,$del_id)
    {
        $this->Admin_model->delete_row($tablename,$del_id);
        // $data = $this->Admin_model->table_column($tablename);
        // echo json_encode($data);
    }
}
?>