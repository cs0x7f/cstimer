var OK_LANG = 'OK';
var CANCEL_LANG = 'Hủy';
var RESET_LANG = 'Thiết lập lại';
var ABOUT_LANG = 'Thông tin';
var ZOOM_LANG = 'Phóng to';
var BUTTON_TIME_LIST = 'THÀNH<br>TÍCH';
var BUTTON_OPTIONS = 'Cài đặt';
var BUTTON_EXPORT = 'Giải phóng';
var BUTTON_DONATE = 'DONATE';
var PROPERTY_USEINS = 'dử dụng thời gian chuẩn bị của WCA';
var PROPERTY_VOICEINS = 'Giọng nói cho thời gian chuẩn bị của WCA: ';
var PROPERTY_VOICEINS_STR = 'Vô giới tính :)) |Nam giới|Nữ giới';
var PROPERTY_USECFM = 'xác nhận time(ok/+2/dnf)';
var PROPERTY_PHASES = 'nhiều đợt: ';
var PROPERTY_TIMERSIZE = 'kích cớ của timer: ';
var CFMDIV_CURTIME = 'Thời gian là: ';
var PROPERTY_USEMILLI = 'sử dụng 0.001s ';
var PROPERTY_SMALLADP = 'Sử dụng font nhỏ hơn cho chữ số hàng thập phân';
var PROPERTY_SCRSIZE = 'kích cớ của scramble: ';
var PROPERTY_SCRMONO = 'Khoảng cách của các chữ scramble';
var PROPERTY_SCRLIM = 'Giới hạn chiều cao của vùng scramble';
var PROPERTY_SCRALIGN = 'Vị trí của scramble: ';
var PROPERTY_SCRALIGN_STR = 'Giữa|Trái|Phải';
var EXPORT_DATAEXPORT = 'Thu thập/giải phóng data';
var EXPORT_TOFILE = 'giải phóng thành file';
var EXPORT_FROMFILE = 'Thu thập từ file';
var EXPORT_TOSERV = 'Giải phóng ra server';
var EXPORT_FROMSERV = 'Thu thập từ  server';
var EXPORT_USERID = 'Hãy viết mã riêng đặc biệt của bạn (chỉ viết bằng chữ cái và số): ';
var EXPORT_INVID = 'Chỉ được viết chữ cái hoặc con số!';
var EXPORT_ERROR = 'Có lỗi xảy ra...';
var EXPORT_NODATA = 'không tìm thấy thông tin từ mã của bạn';
var EXPORT_UPLOADED = 'thu thập thành công';
var BUTTON_SCRAMBLE = 'SCRA-<br>MBLE';
var BUTTON_TOOLS = 'Công cụ';
var CROSS_UNAVAILABLE = 'Không khả dụng cho loại scramble này';
var EOLINE_UNAVAILABLE = 'Không khả dụng cho loại scramble này';
var IMAGE_UNAVAILABLE = 'Không khả dụng cho loại scramble này';
var TOOLS_SELECTFUNC = 'Chức năng: ';
var TOOLS_CROSS = 'giải cross';
var TOOLS_EOLINE = 'giải EOLine';
var TOOLS_IMAGE = 'vẽ scramble';
var TOOLS_STATS = 'Thành tích ( kiểu 1)';
var TOOLS_DISTRIBUTION = 'Thành tích ( kiểu 2)';
var TOOLS_TREND = 'Thành tích ( kiểu 3)';
var PROPERTY_IMGSIZE = 'kích cớ hình vẽ scramble: ';
var TIMER_INSPECT = 'Chuẩn bị';
var TIMER_SOLVE = 'GIải';
var PROPERTY_USEMOUSE = 'sử dụng chuột';
var PROPERTY_TIMEU = 'cập nhập thời gian: ';
var PROPERTY_TIMEU_STR = 'Cập nhập|theo 0.1s|theo giây|Chuẩn bị|Không có';
var PROPERTY_PRETIME = 'Thời gian giữ (Giây(s)): ';
var PROPERTY_ENTERING = 'Nhập thời gian với ';
var PROPERTY_ENTERING_STR = 'timer|gõ vào|stackmat|Giả lập';
var PROPERTY_COLOR = 'Chọn màu nền: ';
var PROPERTY_COLORS = 'màu chữ: |Màu nền: |Màu bảng: |Màu nút: |Màu link: |Màu chữ logo: |màu nền logo: ';
var PROPERTY_VIEW = 'UI style is:';
var PROPERTY_VIEW_STR = 'Auto|Mobile|Desktop';
var COLOR_EXPORT = 'Please save the string for import: ';
var COLOR_IMPORT = 'Please input the string exported: ';
var COLOR_FAIL = 'Incorrect Data, Import Failed';
var PROPERTY_FONTCOLOR_STR = 'Đen|Trắng';
var PROPERTY_COLOR_STR = 'bất kì|kiểu 1|kiểu 2|Kiểu 3|đen|trắng|Kiểu6|tự chọn|export...|import...';
var PROPERTY_FONT = 'Kiểu chữ timer: ';
var PROPERTY_FONT_STR = 'bất kì|bình thường|kí thuật số 1|kí thuật số 2|kí thuật số 3|kí thuật số 4|kí thuật số 5';
var PROPERTY_FORMAT = 'Thể loại thời gian: '
var PROPERTY_USEKSC = 'Sử dụng nút tắt';
var PROPERTY_NTOOLS = 'số công cụ';
var PROPERTY_AHIDE = 'ẩn tất cả khi giải';
var SCRAMBLE_LAST = 'trước';
var SCRAMBLE_NEXT = 'sau';
var SCRAMBLE_SCRAMBLE = ' scramble';
var SCRAMBLE_LENGTH = 'độ dài';
var SCRAMBLE_INPUT = 'Nhập scramble';
var scrdata = [
	['WCA', [
		['3x3x3', "333", 0],
		['4x4x4', "444wca", -40],
		['5x5x5', "555wca", -60],
		['2x2x2', "222so", 0],
		['3x3 BLD', "333ni", 0],
		['3x3 OH', "333oh", 0],
		['3x3 FM', "333fm", 0],
		['3x3 FT', "333ft", 0],
		['megaminx', "mgmp", -70],
		['pyraminx', "pyrso", -10],
		['Square-1', "sqrs", 0],
		['clock', "clko", 0],
		['skewb', "skbso", 0],
		['6x6x6', "666wca", -80],
		['7x7x7', "777wca", -100],
		['4x4 bld', "444bld", -40],
		['5x5 bld', "555bld", -60],
		['3x3 mbld', "r3ni", 5]
	]],
	['Input', [
		['外部', "input", 0]
	]],
	['===WCA===', [
		['--', "blank", 0]
	]],
	['2x2x2', [
		["WCA", "222so", 0],
		['Trường hợp bất kì', "222o", 0],
		['3-gen', "2223", 25],
		['EG', "222eg", 0],
		['EG0', "222eg0", 0],
		['EG1', "222eg1", 0],
		['EG2', "222eg2", 0]
	]],
	['3x3x3', [
		["WCA", "333", 0],
		['kiểu cũ', "333o", 25],
		['3x3x3 cho những thằng đần', "333noob", 25],
		['cạnh', "edges", 0],
		['góc', "corners", 0],
		['tầng 3', "ll", 0],
		['ZBLL', "zbll", 0],
		['COLL', "cll", 0],
		['ELL', "ell", 0],
		['6 cạnh cuối', "lse", 0],
		['6 cạnh cuối &ltM,U&gt', "lsemu", 0],
		['Roux L10P', "cmll", 0],
		['đã giải cross', "f2l", 0],
		['F2L cuối  + tầng 3', "lsll2", 0],
		['2GLL', "2gll", 0],
		['ZBLS', "zbls", 0],
		['ZZLL', "zzll", 0],
		['PLL', "pll", 0],
		['EOLine', "eoline", 0],
		['solve dởm', 'easyc', 3]
	]],
	['4x4x4', [
		["WCA", "444wca", 40],
		['SiGN', "444", 40],
		['trường họp bất kì', "444o", 0],
		['YJ', "444yj", 40],
		['4x4x4 cạnh', "4edge", 8],
		['R,r,U,u', "RrUu", 40]
	]],
	['5x5x5', [
		["WCA", "555wca", 60],
		['SiGN', "555", 60],
		['5x5x5 cạnh', "5edge", 8]
	]],
	['6x6x6', [
		["WCA", "666wca", 80],
		['SiGN', "666si", 80],
		['prefix', "666p", 80],
		['suffix', "666s", 80],
		['6x6x6 cạnh', "6edge", 8]
	]],
	['7x7x7', [
		["WCA", "777wca", 100],
		['SiGN', "777si", 100],
		['prefix', "777p", 100],
		['suffix', "777s", 100],
		['7x7x7 cạnh', "7edge", 8]
	]],
	['Clock', [
		['jaap', "clk", 0],
		['wca', "clkwca", 0],
		['concise', "clkc", 0],
		['efficient pin order', "clke", 0]
	]],
	['Megaminx', [
		["WCA", "mgmp", 70],
		['Carrot', "mgmc", 70],
		['Kiểu cũ', "mgmo", 70]
	]],
	['Pyraminx', [
		["WCA", "pyrso", 10],
		['optimal random state', "pyro", 0],
		['bước bất kì', "pyrm", 25]
	]],
	['Square-1', [
		["WCA", "sqrs", 0],
		['face turn metric', "sq1h", 40],
		['twist metric', "sq1t", 20]
	]],
	['Skewb', [
		["WCA", "skbso", 0],
		['U L R B', "skb", 25]
	]],
	['===OTHER===', [
		['--', "blank", 0]
	]],
	['15 puzzle', [
		['piece moves', "15p", 80],
		['blank moves', "15pm", 80]
	]],
	['LxMxN', [
		['1x3x3 (Floppy Cube)', "133", 0],
		['2x2x3 (Tower Cube)', "223", 0],
		['2x3x3 (Domino)', "233", 25],
		['3x3x4', "334", 40],
		['3x3x5', "335", 25],
		['3x3x6', "336", 40],
		['3x3x7', "337", 40],
		['8x8x8', "888", 120],
		['9x9x9', "999", 120],
		['10x10x10', "101010", 120],
		['11x11x11', "111111", 120]
	]],
	['Gear Cube', [
		['Trường hợp bất kì', "gearso", 0],
		['optimal random state', "gearo", 0],
		['3-gen', "gear", 10]
	]],
	['Cmetrick', [
		[' ', "cm3", 25]
	]],
	['Cmetrick Mini', [
		[' ', "cm2", 25]
	]],
	['Gigaminx', [
		['Pochmann', "giga", 300]
	]],
	['Helicopter Cube', [
		[' ', "heli", 40]
	]],
	['Redi Cube', [
		[' ', "redi", 20]
	]],
	['Pyraminx Crystal', [
		['Pochmann', "prcp", 70],
		['Kiểu cũ', "prco", 70]
	]],
	['Siamese Cube', [
		['khối 1x1x3 ', "sia113", 25],
		['khối 1x2x3', "sia123", 25],
		['khối 2x2x2', "sia222", 25]
	]],
	['Square-2', [
		[' ', "sq2", 20]
	]],
	['Super Floppy', [
		[' ', "sfl", 25]
	]],
	['Super Square-1', [
		['twist metric', "ssq1t", 20]
	]],
	['UFO', [
		['kiểu Jaap', "ufo", 25]
	]],
	['Other', [
		['FTO (Face-Turning Octahedron)', "fto", 25]
	]],
	['===SPECIAL===', [
		['--', "blank", 0]
	]],
	['3x3x3 subsets', [
		['2-gen R,U', "2gen", 25],
		['2-gen L,U', "2genl", 25],
		['Roux-2gen M,U', "roux", 25],
		['3-gen F,R,U', "3gen_F", 25],
		['3-gen R,U,L', "3gen_L", 25],
		['3-gen R,r,U', "RrU", 25],
		['không có bước kép', "half", 25],
		['F2L cuối + tầng 3 ( kiểu cũ )', "lsll", 15]
	]],
	['Bandaged Cube', [
		['Bicube', "bic", 30],
		['Square-1 /,(1,0)', "bsq", 25]
	]],
	['Megaminx subsets', [
		['2-gen R,U', "minx2g", 30],
		['last slot + tầng cuối', "mlsll", 20]
	]],
	['Relays', [
		['Nhiều 3x3x3s', "r3", 5],
		['234 relay', "r234", 0],
		['2345 relay', "r2345", 0],
		['23456 relay', "r23456", 0],
		['234567 relay', "r234567", 0]
	]],
	['=== VUI =)) ===', [
		['--', "blank", 0]
	]],
	['1x1x1', [
		['x y z', "111", 25]
	]],
	['-1x-1x-1', [
		[' ', "-1", 25]
	]],
	['1x1x2', [
		[' ', "112", 25]
	]],
	['LOL', [
		[' ', "lol", 25]
	]],
	['Derrick Eide', [
		[' ', "eide", 25]
	]]
];
var SCRAMBLE_NOOBST = [
	['turn the top face', 'turn the bottom face'],
	['turn the right face', 'turn the left face'],
	['turn the front face', 'turn the back face']
];
var SCRAMBLE_NOOBSS = ' quay theo chiều kim đồn hồ 90 độ,| quay ngược theo chiều kim đồn hồ 90 độ,| quay 180 độ,';
var STATS_CFM_RESET = 'bạn có chắc muốn xóa mọi thời gian trong mục này?';
var STATS_CFM_DELSS = 'bạn có chắc muốn xóa mục này?';
var STATS_CFM_DELMUL = 'The Number Of Deleted Values From Current Index?';
var STATS_CFM_DELETE = 'Xóa thời gian này?';
var STATS_COMMENT = 'bình luận:';
var STATS_CURROUND = 'thành tích vòng hiện tại';
var STATS_CURSESSION = 'thành tích mục hiện tại';
var STATS_AVG = 'mean';
var STATS_SOLVE = 'solve';
var STATS_TIME = 'time';
var STATS_SESSION = 'Session';
var STATS_SESSION_NAME = 'tên session';
var STATS_STRING = 'best|vừa xong|worst|tạo ra bởi csTimer on %Y-%M-%D|solves/tổng: %d|single|mean of %mk|avg of %mk|Average: %v{ (σ = %sgm)}|Mean: %v|Thành tích:';
var STATS_PREC = 'time distribution precision: ';
var STATS_PREC_STR = 'tự động|0.1s|0.2s|0.5s|1s|2s|5s|10s|20s|50s|100s';
var STATS_TYPELEN = 'list %d type|list %d length|average|mean';
var PROPERTY_PRINTSCR = 'In scramble trong thành tích';
var PROPERTY_SUMMARY = 'cho xem bảng thành tích	';
var PROPERTY_IMRENAME = 'yêu cầu đặt tên ngay sau khi tạo 1 mục';
var PROPERTY_SCR2SS = 'tạo ngay 1 mục khi chuyển sang scramble khác';
var PROPERTY_SS2SCR = 'không xóa scramble khi chuyển sang mục khác';
var PROPERTY_STATAL = 'Statistical indicators: ';
var PROPERTY_DELMUL = 'cho phép xóa thời gian cùng 1 lúc';
var MODULE_NAMES = {
	"ui": 'màn hình chính ',
	"color": 'màu',
	"timer": 'timer',
	"kernel": 'global',
	"scramble": 'scramble',
	"stats": 'thành tích',
	"tools": 'công cụ'
};
var BGIMAGE_URL = 'Yêu cầu nhập URL của ảnh';
var BGIMAGE_INVALID = 'URL không hợp lệ';
var BGIMAGE_OPACITY = 'Background: ';
var BGIMAGE_IMAGE = 'background : ';
var BGIMAGE_IMAGE_STR = 'none|tự chọn|CCT';
var SHOW_AVG_LABEL = 'cho xem avg ở dưới timer';
var TOOLS_SCRGEN = 'ScrambleGenerator';
var SCRGEN_NSCR = 'số scrambles: ';
var SCRGEN_PRE = 'prefix: ';
var SCRGEN_GEN = 'Generate Scrambles!';