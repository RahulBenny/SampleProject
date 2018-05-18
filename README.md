# SampleProject

$(document).ready(function () {
    //Populating EvaluatedList Dropdown
    $("#EvaluatorRole").on("change", function () {
        $("#validationDrop1").empty();
        var id = $(this).val();

        if (id == null || id == '') {
            alert("null");
            document.getElementById("EvaluatedRoles").disabled = true;
            return false;
        }

        alert(id);
        document.getElementById("EvaluatedRoles").disabled = false;

        $.ajax({
            type: "GET",
            url: "/Questions/EvaluatedDropdown",
            datatype: "JSON",
            data: { Id: id },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("#EvaluatedRoles").empty();
                $.each(data, function (index, optiondata) {

                    $("#EvaluatedRoles").append('<option value="' + optiondata.RoleID + '">' +
                        optiondata.RoleName + '</option>');

                });


            },
            error: function () {
                alert("Error Occured");
            }

        });
    });
    //To display the Questions Insert Form
    $("#showform").on("click", function () {
        $("#btnUpdate").css("display", "none");
        $("#btnSave").css("display", "inline");
        ShowForm();
    });

    //To display the question List
    $("#showlist").on("click", function () {
        ShowList();
    });

    $("#btnCancel").on("click", function () {
        var con = confirm("Do you want to cancel and return to questions list");
        if(con)
        {
            ShowList();
        }
    });

    //Editing the Questions
    $("#table").on("click", ".jsedit", function () {

        $("#btnUpdate").css("display", "inline");
        $("#btnSave").css("display", "none");
        ShowForm();
        var button = $(this);

        var id = button.attr("data-Question-id");
        //alert(id);        

        $.ajax({
            type: "GET",
            url: "/Questions/FillUpForm",
            datatype: "JSON",
            data: { id: id },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                document.getElementById("EvaluatedRoles").disabled = false;
                //alert(data.question.EvaluatorRole);
                $("#EvaluatorRole").val(data.question.EvaluatorRole);
                
                $("#QuestionText").val(data.question.QuestionText);
                
                $("#QuestionDescription").val(data.question.QuestionDescription);
                $("#Weightage").val(data.question.Weightage);                             
                $("input[name=AnswerOptionID][value=" + data.question.AnswerOptionID + "]").attr('checked', 'checked');
                alert(data.question.AnswerOptionID);
                $("#EvaluatedRoles").empty();
                $.each(data.evaluatedList, function (index, optiondata) {

                    $("#EvaluatedRoles").append('<option value="' + optiondata.RoleID + '">' +
                        optiondata.RoleName + '</option>');

                });
                $("#EvaluatedRoles").val(data.question.EvaluatedRole)
            },
            error: function () {
                alert("Error Occured");
            }
        });
        
    });

    //Deleting the questions
    $("#table").on("click", ".jsdelete", function () {
        var button = $(this);

        var proceed = confirm("Do you want to delete");
        alert(proceed);
        if (proceed)
        {
            var id = button.attr("data-Question-id");
            alert(id);
            $.ajax({
                type: "GET",
                url: "/Questions/DisableQuestions",
                datatype: "JSON",
                data: {id:id},
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    button.parents("tr").remove();
                    alert("Successfully Disabled");
                },
                error: function () {
                    alert("Error Occured");

                }
            });
            
        }
                
    });
});

$(document).ready(function () {
    
});


$(document).ready(function () {
    //$('#table').dataTable();
    $("#btnSave").on("click", function (e) {
        e.preventDefault();

               
        var EvaluationQuestions = new Object();
        EvaluationQuestions.EvaluatorRole = $("#EvaluatorRole").val();

        if (EvaluationQuestions.EvaluatorRole == null || EvaluationQuestions.EvaluatorRole == '')
        {
            $("#validationDrop1").empty();
            $("#validationDrop1").append("Please Select a Role");
            return false;
        }
        EvaluationQuestions.EvaluatedRole = $("#EvaluatedRoles").val();

        EvaluationQuestions.QuestionText = $("#QuestionText").val();
        if (EvaluationQuestions.QuestionText == null || EvaluationQuestions.QuestionText == '')
        {
            $("#validationDrop1").empty();
            $("#validationQuestionText").empty();
            $("#validationQuestionText").append("Please add a question");
            return false;
        }

        EvaluationQuestions.QuestionDescription = $("#QuestionDescription").val();

        EvaluationQuestions.Weightage = $("#Weightage").val();
        if (EvaluationQuestions.Weightage == null || EvaluationQuestions.Weightage == '')
        {
            $("#validationQuestionText").empty();
            $("#validationWeigtage").empty();
            $("#validationWeigtage").append("Please add a Weightage for the question");
            return false;
        }

         

        var IsChecked = $("[name='AnswerOptionID']").is(':checked');

        if (!IsChecked) {
            $("#validationWeigtage").empty();
            $("#validationAnswerOption").empty();
            $("#validationAnswerOption").append("Please select the default answer option");
            return false;
        }

        EvaluationQuestions.AnswerOptionID = $("input[name='AnswerOptionID']:checked").val();
        alert(EvaluationQuestions.AnswerOptionID);
       

        $.ajax({
            type: "POST",
            url: "/Questions/InsertQuestions",
            datatype: "JSON",
            data: JSON.stringify(EvaluationQuestions),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if(data.id == 0)
                {
                    alert("Insertion Failed");
                    alert(data.qv.QuestionText);
                }
                else
                {
                    alert("Insertion Sucess");
                    document.getElementById("form1").reset();
                }
            },
            error: function () {
                alert("Error Occured");

            }

        });
    });
});


function GetDetails(obj) {
    var id = obj.value;
    $.ajax({
        type: "GET",
        url: "/Questions/DisplayAnswerOptionDetails",
        datatype: "JSON",
        data: { Id: id },
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            //alert("sucess");
            $.each(data, function () {
                //alert(data.msg);
                //$(obj.id).prop('title', optiondata.AnswerText)
                document.getElementById(obj.id).setAttribute("title", data.msg);
                //alert(data.msg);
            });
        },
        error: function () {
            alert("Error Occured");
        }
    });
}


function ClearValidations()
{
    $("#validationQuestionText").empty();
    $("#validationWeigtage").empty();
    $("#validationAnswerOption").empty();
}


function ShowForm()
{
    $("#tablecontainer").css("display", "none");
    $("#QuestionForm").css("display", "block");
    
}

function ShowList()
{
    $("#tablecontainer").css("display", "block");
    $("#QuestionForm").css("display", "none");
}
















































//$('input[name=name_of_your_radiobutton]:checked').val();
//$(document).ready(function () {
//    $("#EvaluationQuestions_AnswerOptionID").change(function () {
//        if($(this).is(":checked"))
//        {
//            var valu = $(this).val();
//            alert(valu);
//        }
//    });
//});


//$("#radioID") // select the radio by its id
//    .change(function () { // bind a function to the change event
//        if ($(this).is(":checked")) { // check if the radio is checked
//            var val = $(this).val(); // retrieve the value
//        }
//    });

