<?php 
namespace Src\App\Router;
class Router{
	/**
	 * @var string
	 */
	private $viewPath;
	/**
	 * @var \AltoRouter
	 */
	private $router;
    private $app;
	private $auth;
	private $jwt;
	public $emoji;
	public function __construct(string $viewPath,$app,$auth,$jwt,$emoji){
		$this->viewPath = $viewPath;
		$this->router = new \AltoRouter();
        $this->app = $app;
		$this->auth = $auth;
		$this->jwt = $jwt;
		$this->emoji = $emoji;
	}
	
	public function get(string $url,string $view,?string $name = null): self{
		$this->router->map('GET',$url,$view,$name);
		return $this;
	}
	public function post(string $url,string $view,?string $name = null): self{
		$this->router->map('POST',$url,$view, $name);
		return $this;
	}

	public function run(): self{
		$jwt = $this->jwt;
		$match = $this->router->match();
		$params = $match['params'];
		$view = $match['target'];
		$app = $this->app;
		$title = $app->title;
		$auth = $this->auth;
		$client = $this->emoji;
		$menuTable = $app->Table('menu');
		$PostTable = $app->Table('posts');
		$UsersTable = $app->Table('users');
		$messageTable = $app->Table('message');
		$commentTable = $app->Table('comment');
		$mediaTable = $app->Table('image');
		$notifTable = $app->Table('notifications');
		$fileTable = $app->Table('file');
		$TransactionTable = $app->Table('transaction');
		$AlbumTable = $app->Table('Album');
		$CircleTable = $app->Table('Circles');
		$matchTable = $app->table('Match');
		$followerTable = $app->table('follows');
		$likeTable = $app->table('likes');
		$domain = $app->domain();
		$file_path = $app->upload_path();
		$zarao_id = 10;
		$dateY = 2020;
		$percentage_per_tafaray = 10;
		$routerArray = ['false','posts','photos','circle','contacts','inbox','request','settings','account'
		,'rencontre','incognito','login','register','forgotten','saved'];
		if($auth->isAuth()){
			$session_user_id = $_COOKIE['s_id'];
			$session_devise = $UsersTable->GetUserWithDevise($session_user_id);
			$solde = $TransactionTable->CalculSoldeAccount($session_user_id);
			$devise = $session_devise->devise;
		}
		if(is_array($match) && $auth->isAuth() && !$app->IsAjax()){
			if($match['target'] === 'src'){
				require $this->viewPath . SEP . 'src.php';
				return $this;
			}elseif($match['target'] === 'watch'){
				require $this->viewPath . SEP . 'watch.php';
				return $this;
			}else{
				ob_start();
				require $this->viewPath . SEP .$view . '.php';
				$pagecontenu = ob_get_clean();
				require $this->viewPath . SEP . 'layout/layout.php';
				return $this;
			}
			
		}elseif($app->IsAjax()){
			if(isset($_POST['url']) && !empty($_POST['url'])):
				require $this->viewPath . SEP .$_POST['url'] . '.php';
				return $this;
			else:
				die('route not found');
			endif;
		}elseif(!is_array($match)){
			die('route not found');
			return $this;	
		}else{
			ob_start();
			require $this->viewPath . SEP .$view . '.php';
			$authContent= ob_get_clean();
			require $this->viewPath . SEP . 'layout/authHeader.php';
			return $this;
		}
		try {
		} catch (\Throwable $th) {
			die('une erreur s\'est produite');
		}
	}

}
