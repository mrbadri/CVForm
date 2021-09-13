import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import { useState } from "react";
import { connect } from 'react-redux';
import store from './../../redux/store';
import {setUserListValue} from "./../../redux/actions"


const CV = (props) => {
    const [skills, setSkills] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    store.subscribe(() => {
        localStorage.setItem('userList', JSON.stringify(store.getState()[0]))
    })

    const onSubmit = (data) => {
        let formData = {
            fullName: data.fullName,
            gender: data.gender,
            Marriage: data.Marriage ,
            CMS: data.CMS,
            birthDay: data.birthDay,
            birthMonth: data.birthMonth,
            birthYear: data.birthYear,
            skills :  skills 
        }
        props.dispatch(setUserListValue(formData))
    };

    return ( 
        <div className="CV w-screen text-gray-500  form-fa h-screen flex justify-center items-center p-2" dir="rtl">
            <Container className="relative" >
                <Form className="sm:border md:w-2/4 lg:w-2/5 sm:shadow sm:px-6 sm:py-10 sm:rounded-lg  mx-auto" onsubmit="return false;">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="نام و نام خانوادگی"
                        className="mb-3 "
                    >
                        <Form.Control 
                            {...register('fullName', {required: true, minLength: 3,  maxLength: 80})} 
                            type="text" placeholder="name@example.com"
                        />
                        {/* handle error this input */}
                        {errors.fullName && <span className="text-red-500 text-sm">فرمت این فیلد اشتباه است!</span>}
                    </FloatingLabel>

                    {/* compulsory military service === CMS */}
                    <FloatingLabel className="mb-4" controlId="floatingSelect" label="وضعیت نطام وظیفه">
                        <Form.Select  {...register('CMS', {required: true})} aria-label="Floating label select example">
                            <option value="انجام شده">
                                انجام شده
                            </option>
                            <option value="در حال انجام">
                                در حال انجام
                            </option>
                            <option value="معاف">
                                معاف
                            </option>
                        </Form.Select>
                    </FloatingLabel>

                    <div class="mb-4">
                        <div>
                            مهارت ها:
                        </div>
                        <Multiselect
                        dir="ltr"
                            displayValue="key"
                            onRemove={function noRefCheck(data){
                                let skills = [] ; 
                                data.map(item =>(
                                    skills.push(item.key)
                                ))
                                setSkills(skills)
                            }}
                            onSelect={function noRefCheck(data){
                                let skills = [] ; 
                                data.map(item =>(
                                    skills.push(item.key)
                                ))
                                setSkills(skills)
                            }}
                            options={[
                                {
                                key: 'html'
                                },
                                {
                                key: 'css'
                                },
                                {
                                key: 'javascript'
                                },
                                {
                                key: 'python'
                                },
                            ]}
                            placeholder="سرچ کنید ..."
                        />
                   </div>
                    <div className="mb-4 flex">
                        <div className="ml-1  w-24">جنسیت:</div>
                        <div className="flex form-custom ">
                            <label class="flex items-center w-24 mx-2">
                                <input className="w-4 h-4" {...register("gender", { required: true })} type="radio" value="مرد" checked />
                                <span className="mr-2">
                                    مرد
                                </span>
                            </label>
                            <label class="flex items-center w-24 mx-2">
                                <input className="w-4 h-4" {...register("gender", { required: true })} type="radio" value="زن" />
                                <span className="mr-2">
                                    زن
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="mb-4 flex">
                        <div className="ml-1  w-24">وضعیت تاهل:</div>
                        <div className="flex form-custom ">
                            <label class="flex items-center w-24 mx-2">
                                <input className="w-4 h-4" {...register("Marriage", { required: true })} type="radio" value="مجرد" checked/>
                                <span className="mr-2">
                                    مجرد
                                </span>
                            </label>
                            <label class="flex items-center w-24 mx-2">
                             
                                <input className="w-4 h-4" {...register("Marriage", { required: true })} type="radio" value="متاهل" />
                                <span className="mr-2">
                                    متاهل
                                </span>
                            </label>
                        </div>
                    </div>
                   
                    <div className="">
                        <div className="mb-1">
                                تاریخ تولد:
                        </div>
                        <Form.Group  className="flex mb-4" controlId="formGridState">
                                
                            <Form.Select  {...register('birthDay', {required: true})} defaultValue="روز" required>
                                <option  value="?">روز</option>
                                <option >1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                                <option>16</option>
                                <option>17</option>
                                <option>18</option>
                                <option>19</option>
                                <option>20</option>
                                <option>21</option>
                                <option>22</option>
                                <option>23</option>
                                <option>24</option>
                                <option>25</option>
                                <option>26</option>
                                <option>27</option>
                                <option>28</option>
                                <option>29</option>
                                <option>30</option>
                                <option>31</option>
                            </Form.Select>
                            
                            <Form.Select required  {...register('birthMonth', {required: true})}  defaultValue="Choose...">
                                <option  value="?">ماه</option>
                                <option value="1">فروردین</option>
                                <option value="2">اردیبهشت</option>
                                <option value="3">خرداد</option>
                                <option value="4">تیر</option>
                                <option value="5">مرداد</option>
                                <option value="6">شهریور</option>
                                <option value="7">مهر </option>
                                <option value="8">آبان</option>
                                <option value="9">آذر</option>
                                <option value="10">دی</option>
                                <option value="11">بهمن</option>
                                <option value="12">اسفند</option>
                            </Form.Select>
                            <Form.Select  required {...register('birthYear', {required: true})}  defaultValue="Choose...">
                                <option value="?">سال</option>
                                <option>1375</option>
                                <option>1376</option>
                                <option>1377</option>
                                <option>1378</option>
                                <option>1379</option>
                                <option>1380</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                   
                    <Button onClick={handleSubmit(onSubmit)}   className="w-full shadow-sm font-semibold mt-3" variant="primary"  size="lg" type="submit">
                        ثبت اطلاعات
                    </Button>
                </Form>
            </Container>
        </div>
     );
}
 
export default  connect()(CV);