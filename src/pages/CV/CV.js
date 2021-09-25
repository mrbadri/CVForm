import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useForm , Controller  } from 'react-hook-form';
import Multiselect from "multiselect-react-dropdown";
import { useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
import store from './../../redux/store';
import {setUserListValue} from "./../../redux/actions"
import Snackbar from "../../components/Snackbar/Snackbar";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";
import moment from "moment";
import "./CV.scss"


const CV = (props) => {

    // useState
    const [skills, setSkills] = useState([]);
    const [isValidForm, setIsValidForm] = useState(false);
    const [isMale , setIsMale ] = useState(true);
    const [isValidSkillsMultiselect , setIsValidSkillsMultiselect] = useState(true);

    

    const CVForm = useRef();
    const firstNameInput = useRef();
    const lastNameInput = useRef();
    const maleCheckbox= useRef();
    const femaleCheckbox= useRef();
    const singleCheckbox= useRef();
    const marriedCheckbox= useRef();
    const CMSSelect= useRef();
    const multiselectSkills = useRef();
    const multiDatepicker = useRef();

    let minYearsOld = 10 ; 
    let today = new Date()
    let yearNow = today.getFullYear()
    let yearValid = yearNow - minYearsOld ; 


    // react hook form
    const {
        register,
        handleSubmit,
        reset ,
        control ,
        formState: { errors },
      } = useForm();


    //   redux subscribe
    store.subscribe(() => {
        localStorage.setItem('userList', JSON.stringify(store.getState()[0]))
    })

    // we use this function in resetCVForm() and useEffect and noClick button
    

    useEffect(() => {
        firstNameInput.current.childNodes[0].focus();
    }, [])


    // functions
    const isValidSkillsMultiselectFn = (skills) =>{
        if(skills.length >= 1){
            setIsValidSkillsMultiselect(true)
            return true ; 
        }else{
            setIsValidSkillsMultiselect(false)
            return false ; 
        }
    }

    const onChangeGenderFmail = (e) => {
        if(e.target.checked)
            setIsMale(false)
    }

    const onChangeGenderMail = (e) => {
        if(e.target.checked)
        setIsMale(true)
    }


    const resetCVForm = () => {
        // for reset form
        firstNameInput.current.childNodes[0].value = "" ; 
        lastNameInput.current.childNodes[0].value = "" ; 
        maleCheckbox.current.childNodes[0].checked = false;
        femaleCheckbox.current.childNodes[0].checked = false;
        setIsMale(true)
        singleCheckbox.current.childNodes[0].checked = false;
        marriedCheckbox.current.childNodes[0].checked = false;
        multiselectSkills.current.resetSelectedValues();
        setSkills([])
        if(CMSSelect.current != undefined){
            CMSSelect.current.childNodes[0].value = "";
        }
        console.log(multiDatepicker.current);

        // for error fullName input in second submit : have error in validation 
        reset({
            fullName: ""
          }, {
            keepErrors: true, 
            keepDirty: true,
            keepIsSubmitted: false,
            keepTouched: false,
            keepIsValid: false,
            keepSubmitCount: false,
          });
    }


    const onSubmit = (data) => {
        if(isValidSkillsMultiselectFn(skills)){
            // for test data : Temporary
            console.log(data);

            // generator obj from multi datepicker
            const date = new DateObject(data.date)

            // genertor form data
            let formData = {
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                Marriage: data.Marriage ,
                CMS: data.CMS,
                birthDay: date.day ,
                birthMonth: date.month.number,
                birthYear: date.year,
                skills :  skills 
            }
            console.log(formData);

            // send data to redux
            props.dispatch(setUserListValue(formData))

            // for control snackbar
            setIsValidForm(true)
            setTimeout(() => {
                setIsValidForm(false)
            }, 3500);

            // for reset form
            resetCVForm()
        }
    };

    return ( 
        <div className="CV  form-fa  w-full min-h-screen overflow-y-auto  text-gray-500  flex justify-center items-center p-2" dir="rtl">
            <Container className="relative" >
                <div ref={CVForm}   id="CVForm" className="CV-form my-10 relative  bg-gray-50 rounded-t-xl sm:border md:w-3/4 lg:w-3/5 xl:w-5/12 sm:shadow sm:px-6 sm:py-8 sm:rounded  mx-auto" >
                   
                    <div className="CV-form-title absolute left-0 right-0 -top-8 w-full transform  bg-white border border-red-900  flex justify-center items-center  rounded h-12 text-xl  font-semibold ">
                        رزومه
                    </div>
                    {/* first Name */}
                    <FloatingLabel
                        ref={firstNameInput}
                        controlId="floatingInput"
                        label="نام "
                        className=" mb-3  "
                    >
                        <Form.Control 
                            {...register('firstName', {required: true, minLength: 3,  maxLength: 80})} 
                            type="text"
                            placeholder="first Name"
                            className="mb-1"
                        />
                        {/* handle error this input */}
                        {errors.firstName && <span className="form-error text-red-500 text-sm">فرمت این فیلد اشتباه است!</span>}
                    </FloatingLabel>
                    
                    {/* Last Name */}
                    <FloatingLabel
                        ref={lastNameInput}
                        controlId="floatingInput"
                        label="نام خانوادگی"
                        className=" mb-3 "
                    >
                        <Form.Control 
                            {...register('lastName', {required: true, minLength: 3,  maxLength: 80})} 
                            type="text"
                            placeholder="last Name"
                            className="mb-1"
                        />
                        {/* handle error this input */}
                        {errors.lastName && <span className="form-error text-red-500 text-sm">فرمت این فیلد اشتباه است!</span>}
                    </FloatingLabel>
                    
                    {/* gender */}
                    <div className=" mb-4 flex">
                        <div className="ml-1  w-24">جنسیت:</div>
                        <div className="flex form-custom text-black ">
                            <label ref={maleCheckbox} onChange={onChangeGenderMail} className="container-checkbox flex items-center w-24 mx-2">
                                <input  className="w-4 h-4" {...register("gender", { required: true })} type="radio" value="مرد"  />
                                <span className="mr-2">
                                    مرد
                                </span>
                            </label>
                            <label ref={femaleCheckbox}  onChange={onChangeGenderFmail} className="container-checkbox flex items-center w-24 mx-2">
                                <input   className="w-4 h-4" {...register("gender", { required: true })} type="radio" value="زن"  />
                                <span className="mr-2">
                                    زن
                                </span>
                            </label>
                          
                        </div>
                        {/* handle error this input */}
                        {errors.gender && <span className="form-error text-red-500 text-sm">پرکردن این فیلد اجباری است!</span>}
                    </div>
                    {/* Marriage */}
                    <div className=" mb-4 flex">
                        <div className="ml-1  w-24">وضعیت تاهل:</div>
                        <div className="flex form-custom text-black">
                            <label  ref={singleCheckbox} className="container-checkbox flex items-center w-24 mx-2">
                                <input  className="w-4 h-4" {...register("Marriage", { required: true })} type="radio" value="مجرد"  />
                                <span className="mr-2">
                                    مجرد
                                </span>
                            </label>
                            <label  ref={marriedCheckbox} className="container-checkbox flex items-center w-24 mx-2">
                                <input  className="w-4 h-4" {...register("Marriage", { required: true })} type="radio" value="متاهل"  />
                                <span className="mr-2">
                                    متاهل
                                </span>
                            </label>
                        </div>
                        {/* handle error this input */}
                        {errors.Marriage && <span className="form-error text-red-500 text-sm">پرکردن این فیلد اجباری است!</span>}
                    </div>

                    {/* compulsory military service === CMS */}
                    {isMale && 
                    <div className="mb-4">
                        <FloatingLabel  ref={CMSSelect} className="mb-1" controlId="floatingSelect" label="وضعیت نطام وظیفه">
                            <Form.Select  {...register('CMS', {required: "select one option"})} aria-label="Floating label select example">
                                <option value="">
                                    انتخاب کنید 
                                </option>
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
                        {/* handle error this input */}
                        {(errors.CMS) && <span className="form-error text-red-500 text-sm">لطفا انتخاب کنید!</span>}
                    </div>
                    }
                        
                    {/* date picker birthDay */}
                    <div className=" mb-4">
                        <Controller
                            control={control}
                            name="date"
                            rules={{ required: true }} //optional
                            render={({
                                field: { onChange, name, value },
                                fieldState: { invalid, isDirty }, //optional
                                formState: { errors }, //optional, but necessary if you want to show an error message
                            }) => (
                                <>
                                <div className="mb-1 flex items-center">
                                    <span>تاریخ تولد:</span>
                                    <span className="mr-1 text-sm text-gray-400">(روی کادر پایین کلیک کنید)</span>
                                    {/* handle error this input */}
                                    {errors && errors[name] && errors[name].type === "required" && (
                                        <span className="form-error text-red-500 text-sm mr-2 ">تاریخ تولد خود را انتخاب کنید!</span>
                                    )}
                                </div>
                                <div ref={multiDatepicker} >
                                    <DatePicker
                                        {...register('date')}
                                        render={<InputIcon/>}
                                        calendar={persian}
                                        locale={persian_fa}
                                        value={value || ""}
                                        currentDate={new DateObject( new Date( yearValid , 12 , 30 ))}
                                        minDate="1300/1/1"
                                        maxDate={new DateObject( new Date( yearValid , 12 , 30 ))}
                                        onChange={(date) => {
                                        onChange(date?.isValid ? date : "");
                                        }}
                                        calendarPosition="top-center"
                                        animations={[
                                            opacity(),
                                            transition({
                                            from: 40,
                                            transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                                            }),
                                        ]} 
                                    />
                                </div>
                                </>
                            )}
                        />
                    </div>

                    {/* skills */}
                    <div className=" mb-3">
                        <div className="mb-1">
                            مهارت ها:
                            {/* handle error this input */}
                            {!isValidSkillsMultiselect &&  <span className="form-error text-red-500 text-sm mr-2">حداقل یک مهارت را انتخاب کنید!</span>}
                        </div>
                        <Multiselect
                            ref={multiselectSkills}
                            dir="ltr"
                            isObject={false}
                            onRemove={function noRefCheck(data){
                                setSkills(data);
                                isValidSkillsMultiselectFn(data)
                            }}
                            onSelect={function noRefCheck(data){
                                setSkills(data)
                                isValidSkillsMultiselectFn(data)
                            }}
                           
                            options={[
                                'html',
                                'css',
                                'javascript',
                                'python',
                              ]}
                            placeholder="سرچ کنید ..."
                        />
                   </div>

                    <Button  type="reset"  className="CV-form-btn absolute left-0 right-0 -bottom-9 rounded border h-14 text-xl w-full  shadow-sm font-semibold  " variant="primary"  size="lg" type="submit"
                        onClick={()=>{
                            isValidSkillsMultiselectFn(skills);
                            handleSubmit(onSubmit)() ; 
                        }}
                    >
                        ثبت اطلاعات
                    </Button>
                </div>
            </Container>
            {isValidForm && <Snackbar/>}
        </div>
     );
}
 
export default  connect()(CV);