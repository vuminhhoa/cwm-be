module.exports.EMAIL_DUPLICATED = {
  status: 200,
  success: false,
  data: null,
  message: "Thông tin email đã tồn tại trong hệ thống",
  code: 1001,
  messageCode: "EMAIL_DUPLICATED",
};
module.exports.UNKNOWN_ERROR = {
  status: 400,
  success: false,
  data: null,
  message: "Lỗi không xác định",
  code: 1002,
  messageCode: "UNKNOWN_ERROR",
};
module.exports.ORDER_NOT_FOUND = {
  status: 400,
  success: false,
  data: null,
  message: "Không tìm thấy đơn hàng trên hệ thống",
  code: 1002,
  messageCode: "ORDER_NOT_FOUND",
};
module.exports.LOGIN_FAILED = {
  status: 401,
  success: false,
  data: null,
  message: "Đăng nhập không thành công. Kiểm tra thông tin xác thực",
  code: 1003,
  messageCode: "LOGIN_FAILED",
};
module.exports.USER_NOT_FOUND = {
  status: 200,
  success: false,
  data: null,
  message: "Không tìm thấy thông tin tài khoản",
  code: 1004,
  messageCode: "USER_NOT_FOUND",
};
module.exports.LOGIN_INVALID = {
  status: 200,
  success: false,
  data: null,
  message: "Sai thông tin email hoặc mật khẩu",
  code: 1005,
  messageCode: "LOGIN_INVALID",
};
module.exports.ACCOUNT_DEACTIVE = {
  status: 200,
  success: false,
  data: null,
  message: "Tài khoản chưa được kích hoạt",
  code: 1006,
  messageCode: "ACCOUNT_DEACTIVE",
};
module.exports.INCORRECT_PASSWORD = {
  status: 200,
  success: false,
  data: null,
  message: "Sai thông tin mật khẩu",
  code: 1007,
  messageCode: "INCORRECT_PASSWORD",
};
module.exports.ID_INVALID = {
  status: 200,
  success: false,
  data: null,
  message: "Id không hợp lệ",
  code: 1008,
  messageCode: "ID_INVALID",
};
module.exports.NOT_AUTHORIZED = {
  status: 200,
  success: false,
  data: null,
  message: "Không được phép truy cập",
  code: 403,
  messageCode: "NOT_AUTHORIZED",
};
module.exports.INVALID_TOKEN = {
  status: 200,
  success: false,
  data: null,
  message: "Token không hợp lệ",
  code: 401,
  messageCode: "INVALID_TOKEN",
};
module.exports.ONLY_ADMIN = {
  status: 200,
  success: false,
  data: null,
  message: "Chỉ quản trị viên mới có quyền truy cập",
  code: 1010,
  messageCode: "ONLY_ADMIN",
};
module.exports.ONLY_USER = {
  status: 200,
  success: false,
  data: null,
  message: "Chỉ người dùng mới có quyền truy cập",
  code: 1011,
  messageCode: "ONLY_USER",
};
module.exports.INVALID_EMAIL = {
  status: 200,
  success: false,
  data: null,
  message: "Địa chỉ email không hợp lệ",
  code: 1012,
  messageCode: "INVALID_EMAIL",
};
module.exports.INVALID_PHONE = {
  status: 200,
  success: false,
  data: null,
  message:
    "Số điện thoại khôngh hợp lệ. Yêu cầu nhập đúng định dạng bao gồm 10 chữ số (VD: 0912345678)",
  code: 1012,
  messageCode: "INVALID_PHONE",
};
module.exports.INVALID_IMAGE = {
  status: 200,
  success: false,
  data: null,
  message: "Url ảnh không hợp lệ. Hệ thống chỉ hỗ trợ định dạng JPG, PNG, GIF",
  code: 10012,
  messageCode: "INVALID_IMAGE",
};
module.exports.EMAIL_NOT_EXIST = {
  status: 200,
  success: false,
  data: null,
  message: "Thông tin email không tồn tại trên hệ thống",
  code: 1013,
  messageCode: "EMAIL_NOT_EXIST",
};
module.exports.ACCOUNT_ACTIVED = {
  status: 200,
  success: false,
  data: null,
  message: "Tài khoản đã được kích hoạt",
  code: 1014,
  messageCode: "ACCOUNT_ACTIVED ",
};
module.exports.TOKEN_WRONG = {
  status: 200,
  success: false,
  data: null,
  message: "Mã kích hoạt không hợp lệ",
  code: 1015,
  messageCode: "TOKEN_WRONG ",
};
module.exports.TOKEN_EXPIRED = {
  status: 401,
  success: false,
  data: null,
  message: "Mã token đã hết hạn",
  code: 1016,
  messageCode: "TOKEN_EXPIRED",
};
module.exports.SEND_MAIL_ERROR = {
  status: 200,
  success: false,
  data: null,
  message: "Không thể gửi email xác thực",
  code: 1017,
  messageCode: "SEND_MAIL_ERROR",
};
module.exports.PASSWORD_INVALID = {
  status: 200,
  success: false,
  data: null,
  message: "Độ dài mật khẩu phải từ 6 đến 20 ký tự bao gồm cả chữ và số",
  code: 1018,
  messageCode: "PASSWORD_INVALID",
};
module.exports.PASSWORD_CONFIRM_DOES_NOT_MATCH = {
  status: 200,
  success: false,
  data: null,
  message: "Mật khẩu xác nhận không khớp",
  code: 1019,
  messageCode: "PASSWORD_CONFIRM_DOES_NOT_MATCH",
};
module.exports.EQUIPMENT_GROUP_NOT_FOUND = {
  status: 200,
  success: false,
  data: null,
  message: "Không tìm thấy nhóm thiết bị trên hệ thống",
  code: 1020,
  messageCode: "EQUIPMENT_GROUP_NOT_FOUND",
};
module.exports.EQUIPMENT_GROUP_DUPLICATED = {
  status: 200,
  success: false,
  data: null,
  message: "Thông tin nhóm thiết bị đã tồn tại trên hệ thống",
  code: 1021,
  messageCode: "EQUIPMENT_GROUP_DUPLICATED",
};
module.exports.EQUIPMENT_TYPE_NOT_FOUND = {
  status: 200,
  success: false,
  data: null,
  message: "Không tìm thấy loại thiết bị trên hệ thống",
  code: 1022,
  messageCode: "EQUIPMENT_TYPE_NOT_FOUND",
};
module.exports.EQUIPMENT_TYPE_DUPLICATED = {
  status: 200,
  success: false,
  data: null,
  message: "Thông tin loại thiết bị đã tồn tại trên hệ thống",
  code: 1023,
  messageCode: "EQUIPMENT_TYPE_DUPLICATED",
};
module.exports.EQUIPMENT_UNIT_NOT_FOUND = {
  status: 200,
  success: false,
  data: null,
  message: "Không tìm thấy đơn vị tính trên hệ thống",
  code: 1024,
  messageCode: "EQUIPMENT_UNIT_NOT_FOUND",
};
module.exports.EQUIPMENT_UNIT_DUPLICATED = {
  status: 200,
  success: false,
  data: null,
  message: "Thông tin đơn vị tính đã tồn tại trên hệ thống",
  code: 1025,
  messageCode: "EQUIPMENT_UNIT_DUPLICATED",
};
module.exports.EQUIPMENT_STATUS_NOT_FOUND = {
  status: 200,
  success: false,
  data: null,
  message: "Không tìm thấy trạng thái thiết bị trên hệ thống",
  code: 1026,
  messageCode: "EQUIPMENT_STATUS_NOT_FOUND",
};
module.exports.EQUIPMENT_STATUS_DUPLICATED = {
  status: 200,
  success: false,
  data: null,
  message: "Thông tin trạng thái thiết bị đã tồn tại trong hệ thống",
  code: 1027,
  messageCode: "EQUIPMENT_STATUS_DUPLICATED",
};
module.exports.DEPARTMENT_NOT_FOUND = {
  status: 200,
  success: false,
  data: null,
  message: "Không tìm thấy khoa phòng trên hệ thống",
  code: 1028,
  messageCode: "DEPARTMENT_NOT_FOUND",
};
module.exports.TIMEKEEPING_LOG_DUPLICATED = {
  status: 200,
  success: false,
  data: null,
  message: "Bạn đã chấm công ngày này rồi!",
  code: 1029,
  messageCode: "TIMEKEEPING_LOG_DUPLICATED",
};
module.exports.CARPENTER_NOT_FOUND = {
  status: 200,
  success: false,
  data: null,
  message: "Không tìm thấy thợ mộc",
  code: 1029,
  messageCode: "CARPENTER_NOT_FOUND",
};
module.exports.ROLE_NOT_FOUND = {
  status: 200,
  success: false,
  data: null,
  message: "Không tìm thấy chức vụ trên hệ thống",
  code: 1030,
  messageCode: "ROLE_NOT_FOUND",
};
module.exports.ROLE_DUPLICATED = {
  status: 500,
  success: false,
  data: null,
  message: "Thông tin chức vụ đã tồn tại trong hệ thống",
  code: 1031,
  messageCode: "ROLE_DUPLICATED",
};
module.exports.EQUIPMENT_NOT_FOUND = {
  status: 500,
  success: false,
  data: null,
  message: "Không tìm thấy thiết bị trên hệ thống",
  code: 1032,
  messageCode: "EQUIPMENT_NOT_FOUND",
};
module.exports.TIMEKEEPING_LOG_NOT_FOUND = {
  status: 500,
  success: false,
  data: null,
  message: "Không tìm thấy ngày chấm công trên hệ thống",
  code: 1032,
  messageCode: "TIMEKEEPING_LOG_NOT_FOUND",
};
module.exports.RISK_LEVEL_NOT_FOUND = {
  status: 500,
  success: false,
  data: null,
  message: "Không tìm thấy mức độ rủi ro trên hệ thống",
  code: 1033,
  messageCode: "RISK_LEVEL_NOT_FOUND",
};
module.exports.RISK_LEVEL_DUPLICATED = {
  status: 500,
  success: false,
  data: null,
  message: "Thông tin mức độ rủi ro đã tồn tại trong hệ thống",
  code: 1034,
  messageCode: "RISK_LEVEL_DUPLICATED",
};
module.exports.SUPPLY_TYPE_NOT_FOUND = {
  status: 200,
  success: false,
  data: null,
  message: "Không tìm thấy loại vật tư trên hệ thống",
  code: 1035,
  messageCode: "SUPPLY_TYPE_NOT_FOUND",
};
module.exports.SUPPLY_TYPE_DUPLICATED = {
  status: 200,
  success: false,
  data: null,
  message: "Thông tin loại vật tư đã tồn tại trên hệ thống",
  code: 1036,
  messageCode: "SUPPLY_TYPE_DUPLICATED",
};
module.exports.SUPPLY_NOT_FOUND = {
  status: 200,
  success: false,
  data: null,
  message: "Không tìm thấy vật tư trên hệ thống",
  code: 1037,
  messageCode: "SUPPLY_NOT_FOUND",
};
module.exports.SUPPLY_DUPLICATED = {
  status: 200,
  success: false,
  data: null,
  message: "Thông tin vật tư đã tồn tại trên hệ thống",
  code: 1038,
  messageCode: "SUPPLY_DUPLICATED",
};
module.exports.EQUIPMENT_FIELD_DUPLICATED = {
  status: 200,
  success: false,
  data: null,
  message: "Thông tin model hoặc serial của thiết bị đã tồn tại trên hệ thống",
  code: 1039,
  messageCode: "EQUIPMENT_FIELD_DUPLICATED",
};
