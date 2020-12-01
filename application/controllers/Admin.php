<?php
class Admin extends CI_Controller{
	public $CI = NULL;
	function __construct(){
		parent::__construct();
		$this->load->model('Admin_model');
		$this->load->library('session');
		$this->load->library('excel');
		$this->load->helper('url');
		//$this->load->helper('excel');
		$this->CI = & get_instance();
	}
	
	public function index()
		{
            if($this->session->userdata('id') != ""){
			    $this->load->view('home/index.php');
            }
            else{
                $this->load->view('login');
            }
		}

	public function Insert($tablename, $folder, $current_page, $page)
	{
		$columns = $this->Admin_model->table($tablename);
					for($i=0;$i<count($columns);$i++)
					{
						if($columns[$i]!="id")
						{
						   if($columns[$i]=="date_created") {
								$date = date('Y-m-d');
								$data[$columns[$i]] = $date;
							} else {
								$data[$columns[$i]] = $this->input->post($columns[$i]);
							}
						}
					}
                    if($this->input->post('password')){
                       $data['password'] = sha1($this->input->post('password'));
                    }
                  
					$insert = $this->Admin_model->create($tablename,$data);
					if(isset($insert)){
						redirect('View/'.$folder.'/'.$page.'');
					} else {
						redirect('View/'.$folder.'/'.$current_page.'');
					}
	}

	
	public function View($folder = FALSE, $page = FALSE,$edit =FALSE,$count = FALSE)
	{	
		$data = array();
		
		if($edit !=FALSE && $count == FALSE) {
			$data['edit_id'] = $edit;
			} 
			elseif($edit != FALSE && $count != FALSE) {
				$data['edit_id'] = $edit;
				$data['count'] = $count;
			}
			$this->load->view($folder.'/'.$page,$data);
		
	}

	public function table_column($tablename = FALSE, $column = FALSE)
	{
		return $table_column = $this->Admin_model->table_column($tablename, $column);
	}

	public function table_column_desc($tablename = FALSE, $column = FALSE ,$val =FALSE)
	{
		return $table_column_desc = $this->Admin_model->table_column_desc($tablename, $column ,$val);
	}

	public function table_column_desc_limit($tablename = FALSE, $column = FALSE ,$val =FALSE)
	{
		return $table_column_desc_limit = $this->Admin_model->table_column_desc_limit($tablename, $column ,$val);
	}

	public function table_column_get($tablename = FALSE,  $column = FALSE, $val=FALSE)
	{
		return $table_column = $this->Admin_model->table_column($tablename,$column , $val);
	}

	public function table_column_get_limit($tablename = FALSE,  $column = FALSE, $val=FALSE)
	{
		return $table_column = $this->Admin_model->table_select_data_limit($tablename,$column , $val);
	}
	public function area_cus()
	{
		$output="";
		$area_id=$this->input->post('area_id');
		$output.='<select type="text" name="customer_id" id="customer" class="form-control"><option value="">Select Customer</option>';
		    $customer_list=$this->Admin_model->table_column('customer','area_id',$area_id);
                    foreach($customer_list as $customer_row){ 
                    $output.='<option value="'.$customer_row['id'].'">'.$customer_row['customer_name'].'</option>';
                    }
            	$output.='</select>';
				echo $output;
	}
	public function area_sup()
	{
		$output="";
		$area_id=$this->input->post('area_id');
		$output.='<select type="text" name="supplier_id" id="supplier" class="form-control"><option value="">Select supplier</option>';
		    $customer_list=$this->Admin_model->table_column('supplier','area_id',$area_id);
                    foreach($customer_list as $customer_row){ 
                    $output.='<option value="'.$customer_row['id'].'">'.$customer_row['supplier_name'].'</option>';
                    }
            	$output.='</select>';
				echo $output;
	}
	public function cat_products()
	{
		$output="";
		$cat_id=$this->input->post('cat_id');
		$output.='<select name="product_id[]" id="product" class="form-control product_1"><option value="">select product</option>';
		    $product_list=$this->Admin_model->table_column('product','category_id',$cat_id);
                    foreach($product_list as $product_row){ 
                    $output.='<option value="'.$product_row['id'].'">'.$product_row['product_name'].'</option>';
                    }
            	$output.='</select>';
				echo $output;
	}
	public function sales($tablename,$folder,$current_page,$next_page)
	{
		$data=array();
		$inv_number=$this->input->post('invoice_no');
		$cus_id=$this->input->post('customer_id');
		$product_id=$this->input->post('product_id');
		$rate=$this->input->post('rate');
        $hsn=$this->input->post('hsn');
        $box_rate=$this->input->post('box_rate');
        $piece_rate=$this->input->post('piece_rate');
		$qty=$this->input->post('qty');
		$price=$this->input->post('price');
		$date=$this->input->post('date');
		$saler_id=$this->input->post('saler_id');
		$type=$this->input->post('type');
		$count=count($product_id);
		$data['invoice_no']=$inv_number;
		$data['customer_id']=$cus_id;
		$data['date']=$date;
		for($i=0;$i<$count;$i++){
			$data['product_id']=$product_id[$i];
			$data['rate']=$rate[$i];
            $data['hsn_code']=$hsn[$i];
            $data['box_d_price']=$box_rate[$i];
            $data['piece_d_price']=$piece_rate[$i];
			$data['type']=$type[$i];
			$data['quantity']=$qty[$i];
			$data['price']=$price[$i];
			$this->Admin_model->create('sales_details',$data);
		}
		$grand_total=$this->input->post('grand_total');
		$paid=$this->input->post('paid');
		$due=$this->input->post('due');
        $old_due=$this->input->post('old_due');
        if($this->input->post('paid')==''){
            $paid='0';
            $due=$old_due;
        }
		$data1=array();
		$data1['old_due']=$old_due;
        $data1['new_due']=$due;
		$data1['total']=$this->input->post('total');
		$data1['saler_id']=$saler_id;
		$data1['date_created']=$date;
		$data1['invoice_no']=$inv_number;
		$data1['saled_status']='0';
		$data1['area_id']=$this->input->post('area_id');
		$data1['customer_id']=$cus_id;
		$data1['total_price']=$grand_total;
		$data1['verify']='0';
		$data1['paid']=$paid;
		$this->Admin_model->create('sales',$data1);
		$data2=array();
		$where=array();
		$where['id']=$cus_id;
		$data2['due']=$due;
		$this->Admin_model->update_all('customer',$data2,$where);
		redirect('View/'.$folder.'/'.$next_page.'');
	}
	public function sales_update($tablename,$folder,$current_page,$next_page)
	{
		$data=array();
		$id=$this->input->post('id');
		$inv_number=$this->input->post('invoice_no');
		$cus_id=$this->input->post('customer_id');
		$product_id=$this->input->post('product_id');
		$rate=$this->input->post('rate');
		$qty=$this->input->post('qty');
		$price=$this->input->post('price');
		$date=$this->input->post('date');
		$saler_id=$this->input->post('saler_id');
		$type=$this->input->post('type');
		$count=count($product_id);
		$data['invoice_no']=$inv_number;
		$data['customer_id']=$cus_id;
		$data['date']=$date;
		$where=array();
		for($i=0;$i<$count;$i++){
			$data['product_id']=$product_id[$i];
			$data['rate']=$rate[$i];
			$data['type']=$type[$i];
			$data['quantity']=$qty[$i];
			$data['price']=$price[$i];
			if($id[$i]){
				$where['id']=$id[$i];
				$this->Admin_model->update_all('sales_details',$data,$where);
			}else{
				$this->Admin_model->create('sales_details',$data);
			}
		}
		$grand_total=$this->input->post('grand_total');
		$paid=$this->input->post('paid');
		$due=$this->input->post('due');
		$where2=array();
		$where2['invoice_no']=$inv_number;
		$data1=array();
		$data1['old_due']=$this->input->post('old_due');
		$data1['total']=$this->input->post('total');
		$data1['saler_id']=$saler_id;
		$data1['date_created']=$date;
		$data1['invoice_no']=$inv_number;
		$data1['saled_status']='0';
		$data1['area_id']=$this->input->post('area_id');
		$data1['customer_id']=$cus_id;
		$data1['total_price']=$grand_total;
		$data1['paid']=$paid;
		$this->Admin_model->update_all('sales',$data1,$where2);
		$data2=array();
		$where=array();
		$where['id']=$cus_id;
		$data2['due']=$due;
		$this->Admin_model->update_all('customer',$data2,$where);
		redirect('View/final_sale/final_sale');
	}
	public function saled_out()
	{
		$paid=$this->input->post('paid');
		$damage=$this->input->post('damage');
		$real_grand=$this->input->post('real_grand');
		$inv=$this->input->post('inv');
		$customer_id=$this->input->post('customer_id');
		$due=$this->input->post('due');
		$grand=$real_grand-$damage;
		if($paid == ''){
			$paid=0;
		}
		if($due == ''|| $due == '0'){
			$due=$grand;
		}
		$date=date('d/m/Y');
		$data=array(
			'invoice_no'=>$inv,
			'customer_id'=>$customer_id,
			'total'=>$real_grand,
			'paid'=>$paid,
			'damage'=>$damage,
			'grand_total'=>$grand,
			'date'=>$date,
		);
		$this->Admin_model->create('saled_out',$data);
		$where=array(
			'id'=>$customer_id,
		);
		$data1=array(
			'due'=>$due,
		);
		$this->Admin_model->update_all('customer',$data1,$where);
		$where1=array(
			'invoice_no'=>$inv,
		);
		$data2=array(
			'saled_status'=>'1',
		);
		$this->Admin_model->update_all('sales',$data2,$where1);
		$where2=array(
			'customer_id'=>$customer_id,
		);
		$data3=array(
			'status'=>'1',
		);
		$this->Admin_model->update_all('damage',$data3,$where2);
	}
	public function sales_detail_remove()
	{
		$id=$this->input->post('id');
		$this->Admin_model->delete_row('sales_details',$id);
	}
	public function con_sales($tablename,$folder,$current_page,$next_page)
	{
		$data=array();
		$inv_number=$this->input->post('invoice_no');
		$cus_id=$this->input->post('customer_id');
		$product_id=$this->input->post('product_id');
		$rate=$this->input->post('rate');
		$qty=$this->input->post('qty');
		$price=$this->input->post('price');
		$date=$this->input->post('date');
		$saler_id=$this->input->post('saler_id');
		$type=$this->input->post('type');
		$count=count($product_id);
		$data['invoice_no']=$inv_number;
		$data['customer_id']=$cus_id;
		$data['date']=$date;
		for($i=0;$i<$count;$i++){
			$data['product_id']=$product_id[$i];
			$data['rate']=$rate[$i];
			$data['type']=$type[$i];
			$data['quantity']=$qty[$i];
			$data['price']=$price[$i];
			$this->Admin_model->create('con_sales_details',$data);
		}
		$grand_total=$this->input->post('grand_total');
		if($this->input->post('paid') == ''){
			$paid =0;
		}else{
			$paid =$this->input->post('paid');
		}
		if($this->input->post('due') == ''){
			$due =$this->input->post('grand_total');
		}else{
			$due =$this->input->post('due');
		}
		$data1=array();
		$data1['old_due']=$this->input->post('old_due');
		$data1['damage']=$this->input->post('damage');
		$data1['total']=$this->input->post('total');
		$data1['saler_id']=$saler_id;
		$data1['date_created']=$date;
		$data1['invoice_no']=$inv_number;
		$data1['customer_id']=$cus_id;
		$data1['total_price']=$grand_total;
		$data1['paid']=$paid;
		$this->Admin_model->create('con_sales',$data1);
		$data2=array();
		$where=array();
		$where['id']=$cus_id;
		$data2['due']=$due;
		$this->Admin_model->update_all('customer',$data2,$where);
		$data3=array();
		$where1=array();
		$where1['invoice_no']=$inv_number;
		$data3['saled_status']='1';
		$this->Admin_model->update_all('sales',$data3,$where1);
		if($this->input->post('damage') != ""){
			$data4=array();
			$where4=array();
			$where4['customer_id']=$cus_id;
			$data4['status']='1';
			$this->Admin_model->update_all('damage',$data4,$where4);
		}
		redirect('Admin/bill/'.$folder.'/bill/'.$inv_number.'');
	}
	public function damage($tablename,$folder,$current_page,$next_page)
	{
		$data=array();
		$inv=$this->input->post('invoice_no');
		$inv_number=$this->input->post('damage_no');
		$cus_id=$this->input->post('customer_id');
		$product_id=$this->input->post('product_id');
		$rate=$this->input->post('rate');
		$qty=$this->input->post('qty');
		$price=$this->input->post('price');
		$date=$this->input->post('date');
		$saler_id=$this->input->post('saler_id');
		$type=$this->input->post('type');
		$count=count($product_id);
		$data['dam_no']=$inv_number;
		$data['customer_id']=$cus_id;
		$data['date']=$date;
		for($i=0;$i<$count;$i++){
			$data['product_id']=$product_id[$i];
			$data['rate']=$rate[$i];
			$data['type']=$type[$i];
			$data['quantity']=$qty[$i];
			$data['price']=$price[$i];
			$this->Admin_model->create('damage_details',$data);
		}
		$grand_total=$this->input->post('grand_total');
		$data1=array();
		$data1['saler_id']=$saler_id;
		$data1['date_created']=$date;
		$data1['dam_no']=$inv_number;
		$data1['customer_id']=$cus_id;
		$data1['status']=0;
		$data1['total_price']=$grand_total;
		$this->Admin_model->create('damage',$data1);
		redirect('admin/bill/supply/supply/'.$inv.'');
	}
	public function purchase($tablename,$folder,$current_page,$next_page)
	{
		$data=array();
		$inv_number=$this->input->post('invoice_no');
		$sup_id=$this->input->post('supplier_id');
		$product_id=$this->input->post('product_id');
		$rate=$this->input->post('rate');
		$qty=$this->input->post('qty');
		$price=$this->input->post('price');
		$date=$this->input->post('date');
		$type=$this->input->post('type');
		$count=count($product_id);
		$data['invoice_no']=$inv_number;
		$data['supplier_id']=$sup_id;
		$data['date']=$date;
		for($i=0;$i<$count;$i++){
			$data['product_id']=$product_id[$i];
			$data['rate']=$rate[$i];
			$data['type']=$type[$i];
			$data['qty']=$qty[$i];
			$data['price']=$price[$i];
			$this->Admin_model->create('purchase_details',$data);
		}
		$grand_total=$this->input->post('grand_total');
		$paid=$this->input->post('paid');
		$due=$this->input->post('due');
        $old_due=$this->input->post('old_due');
        if($paid == ''){
            $due=$grand_total;
        }
		$data1=array();
		$data1['old_due']=$old_due;
		$data1['total']=$this->input->post('total');
		$data1['date_created']=$date;
		$data1['invoice_no']=$inv_number;
		$data1['supplier_id']=$sup_id;
		$data1['grand_total']=$grand_total;
		$data1['paid']=$paid;
		$this->Admin_model->create('purchase',$data1);
		$data2=array();
		$where=array();
		$where['id']=$sup_id;
		$data2['due']=$due;
		$this->Admin_model->update_all('supplier',$data2,$where);
		redirect('Admin/bill/'.$folder.'/bill/'.$inv_number.'');
	}

	public function date_sales()
	{
		$max=$this->input->post('max');
		$min=$this->input->post('min');
		$tablename=$this->input->post('table');
		$output="";
		$date_report=$this->Admin_model->get_report($tablename,$min,$max);
		foreach($date_report as $date_report_row){
			$output.='<tr><td>'.$date_report_row['invoice_no'].'</td>';
			$cat_list=$this->Admin_model->table_column('customer','id',$date_report_row["customer_id"]); 
			   foreach($cat_list as $cat_list_row){ 
				   $due=$cat_list_row['due'];
				$output.='<td>'. $cat_list_row["customer_name"].'</td>';
				} 
				 $emp_list=$this->Admin_model->table_column('employee','id',$date_report_row["saler_id"]); 
			   foreach($emp_list as $emp_list_row){ 
				$output.='<td>'.$emp_list_row["employee_name"].'</td>';
				} 
				$output.='<td>'.$date_report_row['total_price'].'</td><td>'.$date_report_row['paid'].'</td><td>'.$date_report_row['date_created'].'</td>';
			    $output.='<td><a href="'.base_url().'admin/bill/sales/bill/'.$date_report_row['invoice_no'].'" class="btn btn-sm btn-info">Bill</a></td></tr>';
		}
		echo $output;
	}
	public function area_sales()
	{
		$area=$this->input->post('area');
		$tablename=$this->input->post('table');
		$state=$this->input->post('state');
		$min=$this->input->post('min');
		$max=$this->input->post('max');
		$output="";
		if($area != ''){
			$date_report=$this->Admin_model->table_column_supply($tablename,'min',$min,'max',$max,'area_id',$area,'saled_status',$state);
		}else{
			$date_report=$this->Admin_model->table_column_supply($tablename,'min',$min,'max',$max,'','','saled_status',$state);
		}
		if($state != '1'){
		foreach($date_report as $date_report_row){
			$output.='<tr><td>'.$date_report_row['invoice_no'].'</td>';
			$cat_list=$this->Admin_model->table_column('customer','id',$date_report_row["customer_id"]); 
			   foreach($cat_list as $cat_list_row){ 
				   $due=$cat_list_row['due'];
				$output.='<td>'. $cat_list_row["customer_name"].'</td>';
				} 
				 $emp_list=$this->Admin_model->table_column('employee','id',$date_report_row["saler_id"]); 
			   foreach($emp_list as $emp_list_row){ 
				$output.='<td>'.$emp_list_row["employee_name"].'</td>';
				} 
				$output.='<td>'.$date_report_row['total_price'].'</td><td>'.$date_report_row['date_created'].'</td>';
				$output.='<td><a href="'.base_url().'admin/bill/sales/bill/'.$date_report_row['invoice_no'].'" class="btn btn-sm btn-info">Order List</a></td>';
				if($state != '1'){ 
				$output.='<td><a href="'.base_url().'admin/bill/supply/supply/'.$date_report_row['invoice_no'].'" class="btn btn-sm btn-primary">Supply</a></td>';
				}
			}
		}else{
			foreach($date_report as $date_report_row){
				$output.='<tr><td>'.$date_report_row['invoice_no'].'</td>';
				$cat_list=$this->Admin_model->table_column('customer','id',$date_report_row["customer_id"]); 
				   foreach($cat_list as $cat_list_row){ 
					   $due=$cat_list_row['due'];
					$output.='<td>'. $cat_list_row["customer_name"].'</td>';
					} 
					 $emp_list=$this->Admin_model->table_column('employee','id',$date_report_row["saler_id"]); 
				   foreach($emp_list as $emp_list_row){ 
					$output.='<td>'.$emp_list_row["employee_name"].'</td>';
					} 
					$saled_list=$this->Admin_model->table_column('saled_out','invoice_no',$date_report_row["invoice_no"]); 
					foreach($saled_list as $saled_list_row){ 
					$output.='<td>'.$saled_list_row["total"].'</td>';
					$output.='<td>'.$saled_list_row["damage"].'</td>';
					$output.='<td>'.$saled_list_row["grand_total"].'</td>';
					$output.='<td>'.$saled_list_row["paid"].'</td>';
					}
					$output.='<td>'.$date_report_row['date_created'].'</td>';
					$output.='<td><a href="'.base_url().'admin/bill/supply/bill/'.$date_report_row['invoice_no'].'" class="btn btn-sm btn-info">Bill</a></td>';
				}
		}
		echo $output;
	}

	public function area_sales_page()
	{
		$area=$this->input->post('area');
		$tablename=$this->input->post('table');
		$state=$this->input->post('state');
		$min=$this->input->post('min');
		$max=$this->input->post('max');
		$output="";
		if($area != ''){
			$date_report=$this->Admin_model->table_column_supply_sales($tablename,'min',$min,'max',$max,'area_id',$area,'saled_status',$state);
		}else{
			$date_report=$this->Admin_model->table_column_supply_sales($tablename,'min',$min,'max',$max,'','','saled_status',$state);
		}
		$i=1;
		foreach($date_report as $date_report_row){
			$output.='<tr><td>'.$date_report_row['invoice_no'].'</td>';
			$cat_list=$this->Admin_model->table_column('customer','id',$date_report_row["customer_id"]); 
			   foreach($cat_list as $cat_list_row){ 
				   $due=$cat_list_row['due'];
				$output.='<td>'. $cat_list_row["customer_name"].'</td>';
				} 
				 $emp_list=$this->Admin_model->table_column('employee','id',$date_report_row["saler_id"]); 
			   foreach($emp_list as $emp_list_row){ 
				$output.='<td>'.$emp_list_row["employee_name"].'</td>';
				} 
				$output.='<td>'.$date_report_row['total_price'].'</td><td>'.$date_report_row['date_created'].'</td>';
				$output.='<td><a href="'.base_url().'admin/bill/sales/bill/'.$date_report_row['invoice_no'].'" class="btn btn-sm btn-info">Order List</a></td>';
				if($state == '0'){
				$output.=' <td><a href="'.base_url().'View/sales/edit_sales/'.$date_report_row['id'].'" class="btn btn-sm btn-warning">Edit</a></td>';
                $output.='<td>';
                if($date_report_row['verify'] =='' || $date_report_row['verify'] =='0' ){ 
				$output.='<button class="btn btn-sm btn-danger verify verify_'.$date_report_row['invoice_no'].'" data-val="0" data-id="'.$date_report_row['invoice_no'].'">Unverified</button>';
                 }else{ 
				$output.='<button class="btn btn-sm btn-success verify verify_'.$date_report_row['invoice_no'].'" data-val="1" data-id="'.$date_report_row['invoice_no'].'">Verified</button>';
                } 
				$output.='</td>';
			}
		$i++; }
		
		echo $output;
	}

	public function add_damage($foldername,$file,$cus_id,$invoice)
	{
		$data=array();
		$data['cus_id']=$cus_id;
		$data['sale_inv']=$invoice;
		$this->load->view(''.$foldername.'/'.$file.'',$data);
	}
	public function verify()
	{
		$where = array();
		$data = array();
		$val=$this->input->post('val');
		$tablename=$this->input->post('tablename');
		$where['invoice_no']=$this->input->post('id');
		if($val == '1'){
			$data['verify']='0';
		}else{
			$data['verify']='1';
		}
		$update_all = $this->Admin_model->update_all($tablename,$data,$where);
		echo json_encode($data);
	}
	public function date_purchase()
	{
		$max=$this->input->post('max');
		$min=$this->input->post('min');
		$tablename=$this->input->post('table');
		$output="";
		$date_report=$this->Admin_model->get_report($tablename,$min,$max);
		foreach($date_report as $date_report_row){
			$output.='<tr><td>'.$date_report_row['invoice_no'].'</td>';
			$cat_list=$this->Admin_model->table_column('supplier','id',$date_report_row["supplier_id"]); 
			   foreach($cat_list as $cat_list_row){ 
				   $due=$cat_list_row['due'];
				$output.='<td>'. $cat_list_row["supplier_name"].'</td>';
				} 
				$output.='<td>'.$date_report_row['grand_total'].'</td><td>'.$date_report_row['paid'].'</td><td>'.$date_report_row['date_created'].'</td>';
			    $output.='<td><a href="'.base_url().'admin/bill/purchase/bill/'.$date_report_row['invoice_no'].'" class="btn btn-sm btn-info">Bill</a></td><td><a href="'.base_url().'View/product/edit_product/'.$date_report_row['id'].'" class=""><i class="fa fa-pencil-square-o" aria-hidden="true" style="font-size:20px;"></i></a><br><a href="'.base_url().'Admin/delete/purchase/purchase/'.$date_report_row['id'].'/list_purchase"><i class="fa fa-trash-o" aria-hidden="true" style="font-size:20px;"></i></a></td></tr>';
		}
		echo $output;
	}

	public function bill($folder,$filename,$inv)
	{
		$data_inv=array();
		$data_inv['invoice']=$inv;
		$this->load->view(''.$folder.'/'.$filename.'',$data_inv);
	}

	public function box_price()
	{
		$product_id=$this->input->post('product_id');
        if($this->input->post('customer_id')){
            $customer_id=$this->input->post('customer_id');
            $data=array();
			$pro_detail=$this->Admin_model->table_select_data_limit('sales_details','product_id',$product_id,'customer_id',$customer_id);
			foreach($pro_detail as $pro_row){
				$data['rate_box']=$pro_row['box_d_price'];
				$data['rate']=$pro_row['piece_d_price'];
			}
        }else{
		$data=array();
			$pro_detail=$this->Admin_model->table_column('product','id',$product_id);
			foreach($pro_detail as $pro_row){
				$data['rate_box']=$pro_row['rate_box'];
				$data['rate']=$pro_row['rate'];
			}
        }
			echo json_encode($data);
	}

	public function purchase_box_price()
	{
		$product_id=$this->input->post('product_id');
		$data=array();
			$pro_detail=$this->Admin_model->table_column('product','id',$product_id);
			foreach($pro_detail as $pro_row){
				$data['rate_box']=$pro_row['purchase_box'];
				$data['rate']=$pro_row['purchase_piece'];
			}
			echo json_encode($data);
	}
	
	public function delete($tablename, $folder, $delete_id, $current_page)
        {
			$delete= $this->Admin_model->delete_row($tablename, $delete_id);
			if(isset($delete)){
				redirect('View/'.$folder.'/'.$current_page.'');
			}
        }
	
	public function Update_all($tablename, $folder, $edit_id, $current_page, $page)
        {
			$where = array();
					$columns = $fields['columns'] = $this->Admin_model->table($tablename);
					for($i=0;$i<count($columns);$i++)
					{
						if(($columns[$i]!="id")&&($columns[$i]!="status")&&($columns[$i]!="date_created"))
						{
							if($columns[$i]=="date_modified") {
								$date = date('Y-m-d');
								$data[$columns[$i]] = $date;
							} else{
								$data[$columns[$i]] = $this->input->post($columns[$i]);
							}
						}
					}
				
				
						$where['id'] = $edit_id;
						$update_all = $this->Admin_model->update_all($tablename,$data,$where);
					
					
					if(isset($update_all)){
						redirect('View/'.$folder.'/'.$page.'');
					} else {
						redirect('View/'.$folder.'/'.$current_page.'');
					}
		}

		public function customer_number(){
			$cus_id=$this->input->post('customer');
			$data=array();
			$cus_num=$this->Admin_model->table_column('customer','id',$cus_id);
			foreach($cus_num as $cus_row){
				$data['cus_num']=$cus_row['contact'];
				$due=$cus_row['due'];
				$data['due']=$due;
			}
			$sales_details=$this->Admin_model->table_select_data_limit('sales','customer_id',$cus_id,'saled_status','0');
			foreach($sales_details as $row){
				$data['invoice_no']=$row['invoice_no'];
				$data['saler_id']=$row['saler_id'];
				$sal_num=$this->Admin_model->table_column('employee','id',$row['saler_id']);
			    foreach($sal_num as $sal_row){
				$data['e_name']=$sal_row['employee_name'];
			    }
				$data['date']=$row['date_created'];
				$data['total']=$row['total'];
				$data['grand']=$due+$row['total'];
			}
			$damage_details=$this->Admin_model->table_select_data_limit('damage','customer_id',$cus_id,'status','0');
			if(count($damage_details)>0){
			foreach($damage_details as $row1){
				$data['damage']=$row1['total_price'];
				$data['grand']=$data['grand']-$data['damage'];
			}
		}
			echo json_encode($data);
		}
		
		public function product_order_page()
		{
			$area=$this->input->post('area');
			$tablename=$this->input->post('table');
			$min=$this->input->post('min');
			$max=$this->input->post('max');
			$output="";
			$i=1;
			$product = $this->Admin_model->table_column($tablename);
			foreach($product as $pro_row){
				$k=0;
				$quantity=0;
				$order=$this->Admin_model->table_column_product_list('sales_details','product_id',$pro_row['id'],'min',$min,'max',$max);
				foreach($order as $row){
					$a=0;
					if($area != ''){
					$area_check=$this->Admin_model->table_column('customer','area_id',$area,'id',$row['customer_id']);
					if(count($area_check)>0){
						$a=1;
					}}
					if($area == '' || $a > 0){
					$saled=$this->Admin_model->val_check('sales','invoice_no',$row['invoice_no'],'saled_status','0','verify','1');
					if(count($saled)>0){
						$k=1;
					if($row['type']=='box'){
						$after_cal=$row['quantity']*$pro_row['box_piece'];
						$quantity_now=$after_cal;
					}else{
						$quantity_now=$row['quantity'];
					}
					$quantity += $quantity_now;
				} } }
				if($k==1){
				$output .= '<tr>';
				$output .= '<td>'.$i.'</td>';
				$output .= '<td>'.$pro_row['product_name'].'</td>';
				$output .= '<td>'.$quantity.'</td>';
				$output .= '</tr>';
			$i++; }}
			echo $output;
		}

		public function sales_details(){
			$cus_id=$this->input->post('customer');
			$output="";
			$sales_details=$this->Admin_model->table_select_data_limit('sales','customer_id',$cus_id,'saled_status','0');
			$i=1;
			if(count($sales_details) >0){
			foreach($sales_details as $row){
				$cus_num=$this->Admin_model->table_column('sales_details','invoice_no',$row['invoice_no']);
				foreach($cus_num as $pro_row){
				$output.='<tr><td style="width:80px;"><input type="text" class="form-control" value="'.$i.'"></td>';
				$output.='<td style="width:180px;"><select name="product_id[]" id="product" class="form-control forms_2 product_1">';
						$product_list=$this->Admin_model->table_column('product','id',$pro_row['product_id']); 
						foreach($product_list as $product_row){ 
							$hsn=$product_row['hsn_code'];
				$output.='<option value="'.$product_row['id'].'">'.$product_row['product_name'].'</option>';
				 }
				$output.='</select></td>';
				
				$output.='<td><input type="text" value="'.$hsn.'" class="form-control"></td><td><input name="type[]" class="form-control" value="'.$pro_row['type'].'"></td>';
				$output.='<td><input name="rate[]" class="form-control" value="'.$pro_row['rate'].'"></td><td><input name="qty[]" class="form-control" value="'.$pro_row['quantity'].'"></td>';
				$output.='<td><input name="price[]" class="form-control" value="'.$pro_row['price'].'"></td>';
				$output.='<td><a href="javascript:void(0);" class="Remove col-sm-1"><button type="button" style="" id="btn1" class="btn btn-danger btn-flat"><i class="fa fa-trash" aria-hidden="true"></i></button> </a></td></tr>';
				$i++; }
			}
		}else{
			$output.='<tr><td colspan="8" class="text-center">No sales order</td></tr>';
		}
			echo $output;
		}
		public function supplier_number(){
			$sup_id=$this->input->post('supplier');
			$data=array();
			$sup_num=$this->Admin_model->table_column('supplier','id',$sup_id);
			foreach($sup_num as $sup_row){
				$data['sup_num']=$sup_row['supplier_contact'];
				$data['due']=$sup_row['due'];
			}
			echo json_encode($data);
		}

		public function product_detail(){
			$product_id=$this->input->post('product_id');
            if($this->input->post('customer_id')){
            $customer_id=$this->input->post('customer_id');
            $data=array();
			$pro_detail=$this->Admin_model->table_select_data_limit('sales_details','product_id',$product_id,'customer_id',$customer_id);
			foreach($pro_detail as $pro_row){
				$data['hsn_code']=$pro_row['hsn_code'];
				$data['rate']=$pro_row['piece_d_price'];
				$data['box_rate']=$pro_row['box_d_price'];
				$data['piece_rate']=$pro_row['piece_d_price'];
			}
            }else{
			$data=array();
			$pro_detail=$this->Admin_model->table_column('product','id',$product_id);
			foreach($pro_detail as $pro_row){
				$data['hsn_code']=$pro_row['hsn_code'];
				$data['rate']=$pro_row['rate'];
				$data['box_rate']=$pro_row['rate_box'];
				$data['piece_rate']=$pro_row['rate'];
				$data['box_qty']=$pro_row['box_piece'];
				$data['purchase_box']=$pro_row['purchase_box'];
			}
            }
			echo json_encode($data);
		}

		public function logout(){
			$user_data = $this->session->all_userdata();
			foreach ($user_data as $key => $value) {
				if ($key != 'session_id' && $key != 'ip_address' && $key != 'user_agent' && $key != 'last_activity') {
					$this->session->unset_userdata($key);
				}
			}
			$this->session->unset_userdata['user_data']['user_data'];
			$this->session->unset_userdata['user_data']['admin'];
			$this->session->sess_destroy();
			redirect('Admin');
		}
        public function Login($tablename)
        {
            $contact = $this->input->post('contact');
            $password =sha1( $this->input->post('password'));
            $check = $this->Admin_model->table_column($tablename,'contact',$contact,'password',$password);
            if(count($check) > 0)
            {
                foreach($check as $row)
                {
                    $this->session->set_userdata('id',$row['id']);
                    $this->session->set_userdata('type',$row['type']);
                    $this->session->set_userdata('employee_name',$row['employee_name']);
                }
                redirect('admin');
            }
            else{
                redirect('admin');
            }
		}
	 public function import()
		{
		 if(isset($_FILES["file"]["name"]))
		 {
		 $path = $_FILES["file"]["tmp_name"];
		 $object = PHPExcel_IOFactory::load($path);
		 foreach($object->getWorksheetIterator() as $worksheet)
			{
		 	$highestRow = $worksheet->getHighestRow();
		 	$highestColumn = $worksheet->getHighestColumn();
		 	for($row=2; $row<=$highestRow; $row++)
		 	{
		 	$category_id = $worksheet->getCellByColumnAndRow(0, $row)->getValue();
		 	$product_name = $worksheet->getCellByColumnAndRow(1, $row)->getValue();
		 	$hsn_code = $worksheet->getCellByColumnAndRow(2, $row)->getValue();
		 	$box_piece = $worksheet->getCellByColumnAndRow(3, $row)->getValue();
		 	$rate = $worksheet->getCellByColumnAndRow(4, $row)->getValue();
		 	$rate_box  = $box_piece*$rate;
		 	$purchase_price = $worksheet->getCellByColumnAndRow(6, $row)->getValue();
		 	$purchase_box = $box_piece*$purchase_price;
		 	$value_in = $worksheet->getCellByColumnAndRow(8, $row)->getValue();
         	$qty = $worksheet->getCellByColumnAndRow(9, $row)->getValue();
			
		 	$data[] = array(
		 	'category_id'  => $category_id,
		 	'product_name'   => $product_name,
		 	'hsn_code'   => $hsn_code,
		 	'box_piece'   => $box_piece,
		 	'rate'   => $rate,
		 	'rate_box'   => $rate_box,
		 	'purchase_piece'   => $purchase_price,
		 	'purchase_box'   => $purchase_box,
		 	'value_in'   => $value_in,
			'qty'   => $qty,
		 	);
		 	}
		 }
		 $this->Admin_model->insert('product',$data);
		 echo 'Data Imported successfully';
		 }
		}
        public function logout_front(){
            $this->session->sess_destroy();
            redirect('admin');
        }
    public function area_sales1()
	{
		$area=$this->input->post('area');
		$tablename=$this->input->post('table');
		$state=$this->input->post('state');
		$min=$this->input->post('min');
		$max=$this->input->post('max');
		$output="";
		if($area == ''){
			$date_report=$this->Admin_model->table_column_supply($tablename,'min',$min,'max',$max,'area_id',$area,'saled_status',$state);
		}else{
			$date_report=$this->Admin_model->table_column_supply($tablename,'min',$min,'max',$max,'','','saled_status',$state);
		}
		if($state == '1'){
		foreach($date_report as $date_report_row){
			$output.='<tr><td>'.$date_report_row['invoice_no'].'</td>';
			$cat_list=$this->Admin_model->table_column('customer','id',$date_report_row["customer_id"]); 
			   foreach($cat_list as $cat_list_row){ 
				   $due=$cat_list_row['due'];
				$output.='<td>'. $cat_list_row["customer_name"].'</td>';
				} 
				 $emp_list=$this->Admin_model->table_column('employee','id',$date_report_row["saler_id"]); 
			   foreach($emp_list as $emp_list_row){ 
				$output.='<td>'.$emp_list_row["employee_name"].'</td>';
				} 
				$output.='<td>'.$date_report_row['total_price'].'</td><td>'.$date_report_row['date_created'].'</td>';
				$output.='<td><a href="'.base_url().'admin/bill/sales/bill/'.$date_report_row['invoice_no'].'" class="btn btn-sm btn-info">Order List</a></td>';
				if($state != '1'){ 
				$output.='<td><a href="'.base_url().'admin/bill/supply/supply/'.$date_report_row['invoice_no'].'" class="btn btn-sm btn-primary">Supply</a></td>';
				}
			}
		}else{
			foreach($date_report as $date_report_row){
				$output.='<tr><td>'.$date_report_row['invoice_no'].'</td>';
				$cat_list=$this->Admin_model->table_column('customer','id',$date_report_row["customer_id"]); 
				   foreach($cat_list as $cat_list_row){ 
					   $due=$cat_list_row['due'];
					$output.='<td>'. $cat_list_row["customer_name"].'</td>';
					} 
					 $emp_list=$this->Admin_model->table_column('employee','id',$date_report_row["saler_id"]); 
				   foreach($emp_list as $emp_list_row){ 
					$output.='<td>'.$emp_list_row["employee_name"].'</td>';
					} 
					$saled_list=$this->Admin_model->table_column('saled_out','invoice_no',$date_report_row["invoice_no"]); 
					foreach($saled_list as $saled_list_row){ 
					$output.='<td>'.$saled_list_row["total"].'</td>';
					$output.='<td>'.$saled_list_row["damage"].'</td>';
					$output.='<td>'.$saled_list_row["grand_total"].'</td>';
					$output.='<td>'.$saled_list_row["paid"].'</td>';
					}
					$output.='<td>'.$date_report_row['date_created'].'</td>';
					$output.='<td><a href="'.base_url().'admin/bill/supply/bill/'.$date_report_row['invoice_no'].'" class="btn btn-sm btn-info">Bill</a></td>';
				}
		}
		echo $output;
	}

}