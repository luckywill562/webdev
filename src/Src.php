<?php
namespace Src;

class Src
{
	public $title = 'Tafaray';
	private static $_instance;
	private $db_instance;
	private $isdev;
	private $php_dev;
	public function __construct($isdev, $php_dev)
	{
		$this->isdev = $isdev;
		$this->php_dev = $php_dev;
	}

	public static function getInstance()
	{
		if (!self::$_instance) {
			self::$_instance = new Src(false, true);
		}
		return self::$_instance;
	}

	public static function load()
	{
		require DIR . '/src/Autoloader.php';
		\Src\Autoloader::register();
		require DIR . '/src/App/Autoloader.php';
		\Src\App\Autoloader::register();
		require DIR . '/src/App/emoji/autoload.php';
	}

	public function getDb()
	{
		try {
			$config = \Src\App\Config::getInstance(DIR . "/config/Config.php");
			if (is_null($this->db_instance)) {
				if ($this->php_dev) {
					$this->db_instance = new \Src\App\Connexion\Mysql($config->get('dev_db_name'), $config->get('dev_db_host'), $config->get('dev_db_user'), $config->get('dev_db_pass'));
				} else {
					$this->db_instance = new \Src\App\Connexion\Mysql($config->get('db_name'), $config->get('db_host'), $config->get('db_user'), $config->get('db_pass'));
				}
			}
			return $this->db_instance;
		} catch (\Throwable $th) {
			$this->Exception($th);
		}
	}

	public function Table($name)
	{
		$class_name = '\\Src\\Table\\Table' . ucfirst($name);
		return new $class_name($this->getDb());
	}

	public function reactdevassets()
	{
		if ($this->isdev) {
			return '
			<script type="module" src="http://localhost:3000/assets/@vite/client"></script>
			<script type="module">
			import RefreshRuntime from "http://localhost:3000/assets/@react-refresh"
			RefreshRuntime.injectIntoGlobalHook(window)
			window.$RefreshReg$ = () => {}
			window.$RefreshSig$ = () => (type) => type
			window.__vite_plugin_react_preamble_installed__ = true
		  </script>
		  ';
		} else {
			return $this->bundleassets();
		}
	}

	public function domain()
	{
		if ($this->php_dev === true) {
			return 'http://localhost:8000/';
		} else {
			return 'https://tafaray.herokuapp.com/';
		}
	}

	public function assetsDev($file)
	{
		return '<script type="module" src="http://localhost:3000/assets/js/' . $file . '.jsx"></script>';
	}

	public function bundleassets()
	{
		$html = '';
		$manifest = json_decode(file_get_contents(dirname(__DIR__) . '/web/assets/manifest.json', false));
		$trim = trim('js/main.jsx', '/');
		$css = $manifest->$trim->css;
		foreach ($css as $cssfile) {
			$html .= '<link rel="stylesheet" href="/assets/' . $cssfile . '">';
		}
		return $html;
	}

	public function homeassets($file)
	{
		if ($this->isdev) {
			return $this->assetsDev($file);
		} else {
			$html = '';
			$manifest = json_decode(file_get_contents(dirname(__DIR__) . '/web/assets/manifest.json', false));
			$trim = trim('js/main.jsx', '/');
			$file = $manifest->$trim->file;
			$html .= '<script type="module" defer src="/assets/' . $file . '"></script>';
			return $html;
		}
	}

	public function authAssets()
	{
		if ($this->isdev) {
			return '
			<script type="module" src="http://localhost:3000/assets/@vite/client"></script>
			<script type="module">
		  import RefreshRuntime from "http://localhost:3000/assets/@react-refresh"
		  RefreshRuntime.injectIntoGlobalHook(window)
		  window.$RefreshReg$ = () => {}
		  window.$RefreshSig$ = () => (type) => type
		  window.__vite_plugin_react_preamble_installed__ = true
		  </script>
		  <script type="module" defer src="http://localhost:3000/assets/js/admin.jsx"></script>
			';
		} else {
			$html = '';
			$manifest = json_decode(file_get_contents(DIR . '/web/assets/manifest.json', false));
			$trim = trim('js/admin.jsx', '/');
			$css = $manifest->$trim->css;
			foreach ($css as $cssfile) {
				$html .= '<link rel="stylesheet" href="/assets/' . $cssfile . '">';
			}
			$file = $manifest->$trim->file;
			$html .= '<script type="module" defer src="/assets/' . $file . '"></script>';
			return $html;
		}
	}

	public function LogoSite()
	{
		try {
			$html = '';
			$manifest = json_decode(file_get_contents(DIR . '/web/assets/manifest.json', false));
			$trim = trim('js/main.jsx', '/');
			$getName = $manifest->$trim->imports[1];
			$logo = $manifest->$getName->assets[0];
			$html = DIRECTORY_SEPARATOR .'assets'.DIRECTORY_SEPARATOR . $logo;
			return $html;
		} catch (\Throwable $th) {
			$this->Exception($th);
		}
	}
	public function dependenciesapp()
	{
		$html = '';
		$html .= '<script type="text/javascript" src="' . $this->domain() . 'dist/lazysizes.min.js"></script>';
		$html .= '<script type="text/javascript" src="' . $this->domain() . 'dist/emojione.min.js"></script>';
		$html .= '<script type="text/javascript" src="' . $this->domain() . 'dist/dep.js"></script>';

		echo $html;
	}
	public function IsAjax()
	{
		return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest' || isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST';
	}

	public function cockiePresence()
	{
		return isset($_COOKIE['isLogedin']) && !empty($_COOKIE['isLogedin']) && isset($_COOKIE['s_id']) && !empty($_COOKIE['s_id']);
	}

	public function NotFound()
	{
		header('HTTP/1.0 Not Found');
		header('location:/404');
	}
	public function redirect()
	{
		header('location:/home');
	}
	public function headerError()
	{
		if ($this->IsAjax()) {
			header('500 Internal Server Error', TRUE, 500);
			echo json_encode(['success' => 0, 'status' => 'une erreur s\'est produite']);
		}
	}
	public function msg($success, $status, $message, $extra = [])
	{
		return array_merge([
			'success' => $success,
			'status' => $status,
			'message' => $message
		], $extra);
	}

	public function E500()
	{
		http_response_code(500);
		echo json_encode($this->msg(0, 500, 'une erreur s\'est produite'));
	}
	public function E422()
	{
		http_response_code(422);
		echo json_encode($this->msg(0, 422, 'Autorisation refusé'));
	}
	public function Exception($th)
	{
		if ($this->isdev) {
			throw $th;
		} else {
			http_response_code(500);
			echo json_encode($this->msg(0, 500, 'exception,une erreur s\'est produite'));
		}

	}


	public function Time($postTime)
	{
		$seconds = time() - strtotime($postTime);
		$year = floor($seconds / 31556926);
		$months = floor($seconds / 2629743);
		$week = floor($seconds / 604800);
		$day = floor($seconds / 86400);
		$hours = floor($seconds / 3600);
		$mins = floor(($seconds - ($hours * 3600)) / 60);
		$secs = floor($seconds % 60);
		$time = [];
		if ($seconds < 3600)
			$time = ['count' => $mins, 'time' => "i"];
		else if ($seconds < 86400)
			$time = ['count' => $hours, 'time' => "h"];
		else if ($seconds < 604800)
			$time = ['count' => $day, 'time' => "j"];
		else if ($seconds < 2629743)
			$time = ['count' => $week, 'time' => "w"];
		else if ($seconds < 31556926)
			$time = ['count' => $months, 'time' => "m"];
		else
			$time = ['count' => $year, 'time' => "y"];
		return $time;
	}
	public function english_days()
	{
		return array('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
	}
	public function french_days()
	{
		return array('lun', 'mar', 'mer', 'jeudi', 'ven', 'sam', 'dim');
	}
	public function english_months()
	{
		return array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
	}
	public function french_months()
	{
		return array('jan', 'fév', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'sep', 'oct', 'nov', 'déc');
	}

	public function createDateFormat($postTime)
	{
		$format = date_parse($postTime);
		$month_num = $format['month'];
		$day_num = $format['day'];
		$year = $format['year'];
		$month_name = date("F", mktime(0, 0, 0, $month_num, 10));
		$moisname = str_replace($this->english_months(), $this->french_months(), $month_name);
		return htmlspecialchars($day_num . '-' . $moisname . '-' . $year);
	}
	public function get_day($postTime)
	{
		$dDate = strtotime($postTime);
		$d = getdate($dDate);
		return str_replace($this->english_days(), $this->french_days(), $d['weekday']);
	}
	public function ConvertTime($postTime)
	{
		$seconds = time() - strtotime($postTime);
		$year = floor($seconds / 31556926);
		$months = floor($seconds / 2629743);
		$week = floor($seconds / 604800);
		$day = floor($seconds / 86400);
		$hours = floor($seconds / 3600);
		$mins = floor(($seconds - ($hours * 3600)) / 60);
		$secs = floor($seconds % 60);
		if ($seconds < 60)
			$time = "A l'instant";
		else if ($seconds < 3600)
			$time = ($mins == 1) ? 'il y a ' . $mins . " s" : 'il y a ' . $mins . " min";
		else if ($seconds < 86400)
			$time = ($hours == 1) ? 'il y a ' . $hours . " h" : 'il y a ' . $hours . " h";
		else if ($seconds < 604800)
			$time = ($day == 1) ? 'il y a ' . $day . " jour" :
				$day > 3 ? 
				'publiée ' . $this->get_day($postTime) :
				'il y a ' . $day . " jours";
		else if ($seconds < 2629743)
			$time = ($week == 1) ? 'il y a ' . $week . " sem" : 'il y a ' . $week . " sem";
		else if ($seconds < 31556926)
			$time = ($months == 1) ? 'il y a ' . $months . " mois" :
				$months > 1 ? 
				$this->createDateFormat($postTime)
				: 'il y a ' . $months . " mois";
		else
			$time = ($year == 1) ? 'il y a ' . $year . " an" : 'il y a ' . $year . " ans";
		return $time;
	}

	public function upload_path()
	{
		return dirname(DIR) . SEP . 'ressources' . SEP;
	}
	public function src($path, $size, $type)
	{
		if ($type === 'avatar' || $type === 'iup') {
			return $this->domain() . 'src/x' . $size . '/' . $type . '/' . $path;
		} elseif ($type === 'media') {
			if (file_exists($this->upload_path() . 'images/' . $path)) {
				return $this->domain() . 'src/x' . $size . '/' . $type . '/' . $path;
			} else {
				return $this->domain() . 'src/x' . $size . '/' . $type . '/safe.jpg';
			}
		} else {
			return $this->domain() . 'src/x' . $size . '/' . $type . '/' . $path;
		}
	}

	public function trim($value)
	{
		return trim(preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $value));
	}
	public function format($number)
	{
		return number_format($number, 2, '.', ' ');
	}
	public function EmojiLoad()
	{
		$client = new \Src\App\Emojione\Client(new \Src\App\Emojione\Ruleset());
		$client->imagePathPNG = $this->domain() . 'emoji/';
		return $client;
	}
	public function session_id()
	{
		if (isset($_COOKIE['s_id'])) {
			return $_COOKIE['s_id'];
		} else {
			return null;
		}
	}

	public function getInt(int $variable)
	{
		if (!filter_var((int) $variable, FILTER_VALIDATE_INT)) {
			return false;
		}
		return true;
	}
	public function getBool(bool $variable)
	{
		if (!filter_var(boolval($variable), FILTER_VALIDATE_BOOLEAN)) {
			return false;
		}
		return true;
	}
	public function date(){
		return date('Y-m-d H:i:s');
	}

}