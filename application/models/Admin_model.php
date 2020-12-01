<?php
class Admin_model extends CI_Model{
	
	public function __construct()
		{
			parent::__construct();
			$this->load->database();
		}
	public function user($user_name,$password)
		{
			$this->db->select('*');
			$this->db->from("employee");
			$this->db->where('emp_name',$user_name);
			$this->db->where('user_type',$password);
			$result=$this->db->get();
			return $result->result_array();
		}
	public function table($table)
		{
			return $fields = $this->db->list_fields($table);
			$this->db->last_query();
		}
	public function create($tablename,$data=array())
		{
			print_r($data);
			$this->db->insert($tablename,$data);
			return $this->db->insert_id();
		}
	function insert($tablename,$data)
		{
			$this->db->insert_batch($tablename, $data);
		}
    public function get_info($table) {
                $query = $this->db->get($table);
                $ret = $query->result_array();
                return $ret;
                
            }
	function table_column($tablename, $column =FALSE,$val=FALSE, $column1 = FALSE, $val1 = FALSE)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			if($column != FALSE){
				$this->db->where($column, $val);
			}
			if($column1 != FALSE) {
				$this->db->where($column1, $val1);
			}
			$result = $this->db->get();
		//	return $this->db->last_query();
			return $result->result_array();
		}
	function table_column_supply_sales($tablename, $column =FALSE,$val=FALSE, $column1 = FALSE, $val1 = FALSE,$column2 = FALSE,$val2 = FALSE,$column3=FALSE,$val3=FALSE)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			if($column != FALSE){
				$this->db->where('date_created>=', $val);
			}
			if($column1 != FALSE) {
				$this->db->where('date_created<=', $val1);
			}
			if($column2 != FALSE) {
				$this->db->where($column2, $val2);
			}
			if($column3 != FALSE) {
				$this->db->where($column3, $val3);
			}
			$result = $this->db->get();
		//	return $this->db->last_query();
			return $result->result_array();
		}
	function table_column_supply($tablename, $column =FALSE,$val=FALSE, $column1 = FALSE, $val1 = FALSE,$column2 = FALSE,$val2 = FALSE,$column3=FALSE,$val3=FALSE)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			if($column != FALSE){
				$this->db->where('date_created>=', $val);
			}
			if($column1 != FALSE) {
				$this->db->where('date_created<=', $val1);
			}
			if($column2 != FALSE) {
				$this->db->where($column2, $val2);
			}
			if($column3 != FALSE) {
				$this->db->where($column3, $val3);
			}
			$this->db->where('verify', '1');
			$result = $this->db->get();
		//	return $this->db->last_query();
			return $result->result_array();
		}
		function table_column_product_list($tablename, $column =FALSE,$val=FALSE, $column1 = FALSE, $val1 = FALSE,$column2 = FALSE,$val2 = FALSE)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			if($column != FALSE) {
				$this->db->where($column, $val);
			}
			if($column1 != FALSE){
				$this->db->where('date >=', $val1);
			}
			if($column1 != FALSE) {
				$this->db->where('date <=', $val2);
			}
			$result = $this->db->get();
		//	return $this->db->last_query();
			return $result->result_array();
		}
	function table_column_desc_limit($tablename, $column =FALSE ,$val=FALSE)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			if($column != FALSE){
			$this->db->where($column, $val);
			}
			$this->db->order_by('date_created', 'DESC');
			$result = $this->db->get();
		//	return $this->db->last_query();
			return $result->result_array();
		}
	function table_column_desc($tablename, $column =FALSE ,$val=FALSE)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			if($column != FALSE){
				$this->db->where($column, $val);
				}
			$this->db->order_by('date_created', 'DESC');
			$result = $this->db->get();
		//	return $this->db->last_query();
			return $result->result_array();
		}
	function table_limits($tablename,$limit=FALSE,$column=FALSE,$order=FALSE)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			if($column != FALSE){
			$this->db->order_by($column,$order);
			}
			$this->db->limit($limit);
			$result = $this->db->get();
		//	return $this->db->last_query();
			return $result->result_array();
		}
	function table_select_data_limit($tablename,$column,$val, $column1 = FALSE, $val1 = FALSE)
		{
			$return = array();
			$this->db->select('*');
			$this->db->from($tablename);
			$this->db->where($column, $val);
			if($column1 != FALSE) {
				$this->db->where($column1, $val1);
			}
			$this->db->order_by('id', 'DESC');
			$this->db->limit(1);
			$result = $this->db->get();
		//	return $this->db->last_query();
			return $result->result_array();
		}
	function val_check($tablename, $column = FALSE, $val = FALSE, $column1 = FALSE, $val1 = FALSE, $column2 = FALSE, $val2 = FALSE)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			$this->db->where($column, $val);
			if($column1 != FALSE) {
				$this->db->where($column1, $val1);
			}
			if($column2 != FALSE) {
				$this->db->where($column2, $val2);
			}
			$result = $this->db->get();
		//	return $this->db->last_query();
			return $result->result_array();
		}
	function val_check_ser($tablename , $column , $val , $min , $max)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			$this->db->where($column , $val);
			$this->db->where('date_created >=',$min);
			$this->db->where('date_created <=',$max);
			$result = $this->db->get();
		//	return $this->db->last_query();
			return $result->result_array();
		}
	function val_check_min($tablename , $min , $max)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			$this->db->where('date_created >=',$min);
			$this->db->where('date_created <=',$max);
			$result = $this->db->get();
		//	return $this->db->last_query();
			return $result->result_array();
		}
	function val_check_bill($tablename, $column = FALSE, $val = FALSE, $limit = FALSE)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			$this->db->where($column, $val);
			$this->db->order_by('id', 'DESC');
			$this->db->limit($limit);
			$result = $this->db->get();
		//	return $this->db->last_query();
			return $result->result_array();
		}
	function invoice($tablename)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			$this->db->order_by('id', 'DESC');
			$this->db->limit(1);
			$result = $this->db->get();
			return $result->result_array();
		}
	function get_bill($tablename , $invoice)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			$this->db->where('invoice_no',$invoice);
			$result = $this->db->get();
			return $result->result_array();
		}
	function get_total($tablename, $min ,$max)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			$this->db->where('date_created >=',$min);
			$this->db->where('date_created <= ',$max);
			$result = $this->db->get();
			return $result->result_array();
		}
	function available_cus_cylinder($customer_id)
		{
			$this->db->select('*');
			$this->db->from('billing');
			$this->db->where('customer_id', $customer_id);
			$this->db->order_by('date_created', 'DESC');
			$this->db->limit('1');
			$result = $this->db->get();
		//	return $this->db->last_query();
			return $result->result_array();
		}
	public function delete_row($tablename, $delete_id)
		{
			$this->db->select('*');
			$this->db->from($tablename);
			// if($tablename == "employee"){
			// 	$this->db->where('emp_id', $delete_id);
			// }
			// else{
				$this->db->where('id', $delete_id);
			// }
			  return $query = $this->db->delete($tablename);
		}
	public function get_report($tablename,$min,$max)
	{
		$this->db->select('*');
		$this->db->from($tablename);
		$this->db->where('date_created>=', $min);
		$this->db->where('date_created<=', $max);
		$result = $this->db->get();
		//	return $this->db->last_query();
		return $result->result_array();
	}
	public function update_all($tablename, $data=array(),$where=array())
		{
			return $this->db->update($tablename,$data,$where);
		}
}