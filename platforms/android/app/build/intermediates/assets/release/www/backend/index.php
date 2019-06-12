<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

//require '../../private_html/persocoapi/vendor/autoload.php';
require '../vendor/autoload.php';

$config['displayErrorDetails'] = true; // Turn this off in live mode
$config['addContentLengthHeader'] = false;

$config['db']['host']   = "db.mitchellansems.nl";
$config['db']['user']   = "u4959p13800_dbuser";
$config['db']['pass']   = "ts6ICcJ2MO";
$config['db']['dbname'] = "u4959p13800_persoco";

/*
$config['db']['host']   = "127.0.0.1";
$config['db']['user']   = "root";
$config['db']['pass']   = "";
$config['db']['dbname'] = "test";
*/
// Create the app, with configuration settings for the database
$app = new \Slim\App(["settings" => $config]);

// Set options to support CORS
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// Retrieve the container (for dependency injection)
$container = $app->getContainer();

// Add the database injection
$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'],
        $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};

$app->get('/getToken', function (Request $request, Response $response) {
	// Generate new unique token
	$token = bin2hex(openssl_random_pseudo_bytes(16));
	//$cs_id = strtoupper(bin2hex(openssl_random_pseudo_bytes(3))); // For the crowdsourcing only

	// Create a participant in the database
	try {
		$q = $this->db->prepare("INSERT INTO participants(unique_token) VALUES (:token)");
		$q->bindParam(':token', $token);
		//$q->bindParam(':cs_id', $cs_id);
		$q->execute();

        $response->write('{"token": "'.$token.'"}');
        return $response;        
	} 

	catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->post('/saveQuestionnaireResponse', function (Request $request, Response $response) {
    // Retrieve parameters (POST values)
    //$vals = $request->getParsedBody();

    $vals = json_decode($request->getBody(), true);

    try 
    {
    	// Find participant matching the token
        $p_query = $this->db->prepare("SELECT * FROM participants WHERE unique_token = :token");
        $p_query->bindParam(':token', $vals['token']);
        $p_query->execute();
 
        $participant = $p_query->fetch(PDO::FETCH_OBJ);
        
        if (!$participant) {
        	return $response->write('{"error":{"text": "NO_PARTICIPANT"}}');
        }

        // See if a previous response exists
        $er_query = $this->db->prepare("SELECT * FROM q_answers WHERE participant_id = :pid AND question = :q");
        $er_query->bindParam(':pid', $participant->participant_id);
        $er_query->bindParam(':q', $vals['question']);
        $er_query->execute();

        $existingresponse = $er_query->fetch(PDO::FETCH_OBJ);

        if ($existingresponse) {
            $r_query = $this->db->prepare("UPDATE q_answers SET answer = :a, time_on_task_ms = :tot WHERE participant_id = :pid AND question = :q");
            $r_query->bindParam(':pid', $participant->participant_id);
            $r_query->bindParam(':q', $vals['question']);
            $r_query->bindParam(':a', $vals['answer']);
            // @TODO: if we ever allow people to go back to the questionnaire after filling it out once, this won't work well anymore (ToT keeps getting added)
            $tot = $vals['tot'] + $existingresponse->time_on_task_ms;
            $r_query->bindParam(':tot', $tot);
            $r_query->execute();            
            $response->write('{"return": "UPDATED"}');
        }

        else {
            // Add the response to this participant
            $r_query = $this->db->prepare("INSERT INTO q_answers(participant_id, question, answer, time_on_task_ms) VALUES(:pid, :q, :a, :tot)");
            $r_query->bindParam(':pid', $participant->participant_id);
            $r_query->bindParam(':q', $vals['question']);
            $r_query->bindParam(':a', $vals['answer']);
            $r_query->bindParam(':tot', $vals['tot']);
            $r_query->execute();
            $response->write('{"return": "OK"}');
        }

	    return $response;        
    }

    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->get('/getCoachObject/{token}', function (Request $request, Response $response) {
    $token = $request->getAttribute('token');

    try 
    {
        // Find participant matching the token
        $p_query = $this->db->prepare("SELECT c.* FROM participants p JOIN coach c ON p.participant_id = c.participant_id WHERE p.unique_token = :token");
        $p_query->bindParam(':token', $token);
        $p_query->execute();
 
        $data = $p_query->fetch(PDO::FETCH_OBJ);

        if ($data) {
            return $response->write('{"result": '.json_encode($data).'}');            
        }

        else {
            return $response->write('{"error":{"text": "NODATA"}}');
        }
    
    }

    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->get('/getPid/{token}', function (Request $request, Response $response) {
    $token = $request->getAttribute('token');

    try {
        
        $p_query = $this->db->prepare("SELECT * FROM participants WHERE unique_token = :token");
        $p_query->bindParam(':token', $token);
        $p_query->execute();
 
        $participant = $p_query->fetch(PDO::FETCH_OBJ);
        
        if (!$participant) {
            return $response->write('{"error":{"text": "NO_PARTICIPANT"}}');
        }

        $response->write('{"result": '.json_encode($participant->participant_id).'}');
        return $response;        
    } 

    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->get('/getReminderTime/{token}', function (Request $request, Response $response) {
    $token = $request->getAttribute('token');
    try 
    {
        // Find reminder time matching the token
        $p_query = $this->db->prepare("SELECT a.answer FROM q_answers a JOIN participants p ON a.participant_id=p.participant_id WHERE a.question = 'participant_reminder_time' AND  p.unique_token = :token");
        $p_query->bindParam(':token', $token);
        $p_query->execute();
 
        $data = $p_query->fetch(PDO::FETCH_OBJ);

        if ($data) {
            return $response->write('{"result": '.json_encode($data).'}');            
        }

        else {
            return $response->write('{"error":{"text": "NODATA"}}');
        }
    
    }

    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->get('/getSetting/{token}/{key}', function (Request $request, Response $response) {
    $token = $request->getAttribute('token');
    $key = $request->getAttribute('key');

    try 
    {
        // Find participant matching the token
        $p_query = $this->db->prepare("SELECT s.settingValue FROM participants p JOIN settings s ON p.participant_id = s.participant_id WHERE p.unique_token = :token AND s.settingKey = :key");
        $p_query->bindParam(':token', $token);
        $p_query->bindParam(':key', $key);
        $p_query->execute();
 
        $data = $p_query->fetch(PDO::FETCH_OBJ);

        if ($data) {
            return $response->write('{"result": '.json_encode($data).'}');            
        }

        else {
            return $response->write('{"error":{"text": "NODATA"}}');
        }
    
    }

    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->post('/saveSetting', function (Request $request, Response $response) {
    // Retrieve parameters (POST values)
    //$vals = $request->getParsedBody();

    $vals = json_decode($request->getBody(), true);

    try 
    {
        // Find participant matching the token
        $p_query = $this->db->prepare("SELECT * FROM participants WHERE unique_token = :token");
        $p_query->bindParam(':token', $vals['token']);
        $p_query->execute();
 
        $participant = $p_query->fetch(PDO::FETCH_OBJ);
        
        if (!$participant) {
            return $response->write('{"error":{"text": "NO_PARTICIPANT"}}');
        }

        // See if a previous response exists
        $er_query = $this->db->prepare("SELECT * FROM settings WHERE participant_id = :pid AND settingKey = :k");
        $er_query->bindParam(':pid', $participant->participant_id);
        $er_query->bindParam(':k', $vals['settingKey']);
        $er_query->execute();

        $existingresponse = $er_query->fetch(PDO::FETCH_OBJ);

        if ($existingresponse) {
            $r_query = $this->db->prepare("UPDATE settings SET settingValue = :v WHERE participant_id = :pid AND settingKey = :k");
            $r_query->bindParam(':pid', $participant->participant_id);
            $r_query->bindParam(':k', $vals['settingKey']);
            $r_query->bindParam(':v', $vals['settingValue']);
            $r_query->execute();            
            $response->write('{"return": "UPDATED"}');
        }

        else {
            // Add the response to this participant
            $r_query = $this->db->prepare("INSERT INTO settings(participant_id, settingKey, settingValue) VALUES(:pid, :k, :v)");
            $r_query->bindParam(':pid', $participant->participant_id);
            $r_query->bindParam(':k', $vals['settingKey']);
            $r_query->bindParam(':v', $vals['settingValue']);
            $r_query->execute();
            $response->write('{"return": "OK"}');
        }

        return $response;        
    }

    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->post('/clearSettings', function (Request $request, Response $response) {
    // Retrieve parameters (POST values)
    //$vals = $request->getParsedBody();

    $vals = json_decode($request->getBody(), true);

    try 
    {
        // Find participant matching the token
        $p_query = $this->db->prepare("SELECT * FROM participants WHERE unique_token = :token");
        $p_query->bindParam(':token', $vals['token']);
        $p_query->execute();
 
        $participant = $p_query->fetch(PDO::FETCH_OBJ);
        
        if (!$participant) {
            return $response->write('{"error":{"text": "NO_PARTICIPANT"}}');
        }

        // See if a previous response exists
        $er_query = $this->db->prepare("DELETE FROM settings WHERE participant_id = :pid");
        $er_query->bindParam(':pid', $participant->participant_id);
        $er_query->execute();

        //$existingresponse = $er_query->fetch(PDO::FETCH_OBJ);

        return $response->write('{"return":"OK"}');        
    }

    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->post('/saveCoachObject', function (Request $request, Response $response) {
    // Retrieve parameters (POST values)
    //$vals = $request->getParsedBody();

    $vals = json_decode($request->getBody(), true);

    try 
    {
        // Find participant matching the token
        $p_query = $this->db->prepare("SELECT * FROM participants WHERE unique_token = :token");
        $p_query->bindParam(':token', $vals['token']);
        $p_query->execute();
 
        $participant = $p_query->fetch(PDO::FETCH_OBJ);
        
        if (!$participant) {
            return $response->write('{"error":{"text": "NO_PARTICIPANT"}}');
        }

        // See if a previous response exists
        $er_query = $this->db->prepare("SELECT * FROM coach WHERE participant_id = :pid");
        $er_query->bindParam(':pid', $participant->participant_id);
        $er_query->execute();

        $existingresponse = $er_query->fetch(PDO::FETCH_OBJ);

        if ($existingresponse) {
            $r_query = $this->db->prepare("UPDATE coach SET gender_id = :ge, hairstyle_id = :h, glasses_id = :gl, shirt_id = :shi, pants_id = :pa, shoes_id = :sho, watch_id = :w, profession_id = :pr WHERE participant_id = :pid");
            $r_query->bindParam(':pid', $participant->participant_id);
            $r_query->bindParam(':ge', $vals['coach']['gender_id']);
            $r_query->bindParam(':h', $vals['coach']['hairstyle_id']);
            $r_query->bindParam(':gl', $vals['coach']['glasses_id']);
            $r_query->bindParam(':shi', $vals['coach']['shirt_id']);
            $r_query->bindParam(':pa', $vals['coach']['pants_id']);
            $r_query->bindParam(':sho', $vals['coach']['shoes_id']);
            $r_query->bindParam(':w', $vals['coach']['watch_id']);
            $r_query->bindParam(':pr', $vals['coach']['profession_id']);
            $r_query->execute();            
            $response->write('{"return": "UPDATED"}');
        }

        else {
            // Add the response to this participant
            $r_query = $this->db->prepare("INSERT INTO coach(participant_id, gender_id, hairstyle_id, glasses_id, shirt_id, pants_id, shoes_id, watch_id, profession_id) VALUES(:pid, :ge, :h, :gl, :shi, :pa, :sho, :w, :pr)");
            $r_query->bindParam(':pid', $participant->participant_id);
            $r_query->bindParam(':ge', $vals['coach']['gender_id']);
            $r_query->bindParam(':h', $vals['coach']['hairstyle_id']);
            $r_query->bindParam(':gl', $vals['coach']['glasses_id']);
            $r_query->bindParam(':shi', $vals['coach']['shirt_id']);
            $r_query->bindParam(':pa', $vals['coach']['pants_id']);
            $r_query->bindParam(':sho', $vals['coach']['shoes_id']);
            $r_query->bindParam(':w', $vals['coach']['watch_id']);
            $r_query->bindParam(':pr', $vals['coach']['profession_id']);
            $r_query->execute();            
            $response->write('{"return": "OK"}');
        }

        return $response;        
    }

    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->post('/saveEvent', function (Request $request, Response $response) {
    // Retrieve parameters (POST values)
    $vals = json_decode($request->getBody(), true);

    try 
    {
        // Find participant matching the token
        $p_query = $this->db->prepare("SELECT * FROM participants WHERE unique_token = :token");
        $p_query->bindParam(':token', $vals['token']);
        $p_query->execute();
 
        $participant = $p_query->fetch(PDO::FETCH_OBJ);
        
        if (!$participant) {
            return $response->write('{"error":{"text": "NO_PARTICIPANT"}}');
        }

        // Add the response to this participant
        $r_query = $this->db->prepare("INSERT INTO events(participant_id, event, timestamp) VALUES(:pid, :e,  CURRENT_TIME())");
        $r_query->bindParam(':pid', $participant->participant_id);
        $r_query->bindParam(':e', $vals['event']);
        //$r_query->bindParam(':t', $vals['timestamp']);
        $r_query->execute();
        $response->write('{"return": "OK"}');



        return $response;        
    }





    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->post('/saveScore', function (Request $request, Response $response) {
    // Retrieve parameters (POST values)
    $vals = json_decode($request->getBody(), true);

    try 
    {
        // Find participant matching the token
        $p_query = $this->db->prepare("SELECT * FROM participants WHERE unique_token = :token");
        $p_query->bindParam(':token', $vals['token']);
        $p_query->execute();
 
        $participant = $p_query->fetch(PDO::FETCH_OBJ);
        
        if (!$participant) {
            return $response->write('{"error":{"text": "NO_PARTICIPANT"}}');
        }

        // Add the response to this participant
        $r_query = $this->db->prepare("INSERT INTO nback_results(participant_id, game_mode, n_back, num_position_correct, num_position_incorrect, num_sound_correct, num_sound_incorrect) VALUES(:pid, :m, :nb, :npc, :npi, :nsc, :nsi)");
        $r_query->bindParam(':pid', $participant->participant_id);
        $r_query->bindParam(':m', $vals['mode']);
        $r_query->bindParam(':nb', $vals['n_back']);
        $r_query->bindParam(':npc', $vals['num_position_correct']);
        $r_query->bindParam(':npi', $vals['num_position_incorrect']);
        $r_query->bindParam(':nsc', $vals['num_sound_correct']);
        $r_query->bindParam(':nsi', $vals['num_sound_incorrect']);
        $r_query->execute();
        $response->write('{"return": "OK"}');



        return $response;        
    }





    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->post('/saveNotification', function (Request $request, Response $response) {
    // Retrieve parameters (POST values)
    $vals = json_decode($request->getBody(), true);

    try 
    {
        // Find participant matching the token
        $p_query = $this->db->prepare("SELECT * FROM participants WHERE unique_token = :token");
        $p_query->bindParam(':token', $vals['token']);
        $p_query->execute();
 
        $participant = $p_query->fetch(PDO::FETCH_OBJ);
        
        if (!$participant) {
            return $response->write('{"error":{"text": "NO_PARTICIPANT"}}');
        }

        // Add the response to this participant
        $r_query = $this->db->prepare("INSERT INTO notifications(participant_id, usefulness_of_notification, notification_message) VALUES(:pid, :uon, :m)");
        $r_query->bindParam(':pid', $participant->participant_id);
        $r_query->bindParam(':uon', $vals['notification']);
        $r_query->bindParam(':m', $vals['message']);
        $r_query->execute();
        $response->write('{"return": "OK"}');



        return $response;        
    }





    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->get('/getPersuasionProfile/{token}', function (Request $request, Response $response) {
    $token = $request->getAttribute('token');

    try 
    {
        // Find participant matching the token
        $p_query = $this->db->prepare("SELECT pe.* FROM participants pa JOIN persuasion_profile pe ON pa.participant_id = pe.participant_id WHERE pa.unique_token = :token");
        $p_query->bindParam(':token', $token);
        $p_query->execute();
 
        $data = $p_query->fetch(PDO::FETCH_OBJ);

        if ($data) {
            return $response->write('{"result": '.json_encode($data).'}');            
        }

        else {
            return $response->write('{"error":{"text": "NODATA"}}');
        }
    
    }

    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->post('/saveTime', function (Request $request, Response $response) {
    // Retrieve parameters (POST values)
    $vals = json_decode($request->getBody(), true);
    $time = $vals['time']/1000;

    try 
    {
        // Find participant matching the token
        $p_query = $this->db->prepare("SELECT * FROM participants WHERE unique_token = :token");
        $p_query->bindParam(':token', $vals['token']);
        $p_query->execute();
 
        $participant = $p_query->fetch(PDO::FETCH_OBJ);
        
        if (!$participant) {
            return $response->write('{"error":{"text": "NO_PARTICIPANT"}}');
        }

        // See if a previous response exists
        $er_query = $this->db->prepare("SELECT * FROM usage_time WHERE participant_id = :pid AND day = CURRENT_DATE()");
        $er_query->bindParam(':pid', $participant->participant_id);
        $er_query->execute();

        $existingresponse = $er_query->fetch(PDO::FETCH_OBJ);

        if ($existingresponse) {
            $r_query = $this->db->prepare("UPDATE usage_time SET time_spent = :ts, time_in_time = SEC_TO_TIME(:tit) WHERE participant_id = :pid AND day = CURRENT_DATE()");
            $r_query->bindParam(':pid', $participant->participant_id);
            $r_query->bindParam(':ts', $vals['time']);
            $r_query->bindParam(':tit', $time);
            $r_query->execute();            
            $response->write('{"return": "UPDATED"}');
        }

        else {
            // Add the response to this participants
            $r_query = $this->db->prepare("INSERT INTO usage_time(participant_id, day, time_spent, time_in_time) VALUES(:pid, CURRENT_DATE(), :ts , SEC_TO_TIME(:tit))");
            $r_query->bindParam(':pid', $participant->participant_id);
            $r_query->bindParam(':ts', $vals['time']);
            $r_query->bindParam(':tit', $time);
            $r_query->execute();
            $response->write('{"return": "OK"}');
        }

        return $response;        
    }

    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->get('/getTime/{token}', function (Request $request, Response $response) {
    $token = $request->getAttribute('token');

    // Get the code for crowdsourcing evaluation (to link responses from the CS platform to our data)
    try {
        $p_query = $this->db->prepare("SELECT * FROM participants WHERE unique_token = :token");
        $p_query->bindParam(':token', $token);
        $p_query->execute();
 
        $participant = $p_query->fetch(PDO::FETCH_OBJ);

        $p_query2 = $this->db->prepare("SELECT time_spent FROM usage_time WHERE participant_id = :pid AND day = CURRENT_DATE()");
        $p_query2->bindParam(':pid', $participant->participant_id);
        $p_query2->execute();

        $time_retreived = $p_query2->fetch(PDO::FETCH_OBJ);
        
        if (!$participant) {
            return $response->write('{"error":{"text": "NO_PARTICIPANT"}}');
        }

        $response->write($time_retreived->time_spent);
        return $response;        
    } 

    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->get('/getGroup/{token}', function (Request $request, Response $response) {
    $token = $request->getAttribute('token');

    // Get the code for crowdsourcing evaluation (to link responses from the CS platform to our data)
    try {
        
        $p_query = $this->db->prepare("SELECT * FROM participants WHERE unique_token = :token");
        $p_query->bindParam(':token', $token);
        $p_query->execute();
 
        $participant = $p_query->fetch(PDO::FETCH_OBJ);
        
        if (!$participant) {
            return $response->write('{"error":{"text": "NO_PARTICIPANT"}}');
        }

        if ($participant->participant_id % 2 == 0){
            $sg = 2;
        } else {
            $sg = 1;
        }
        $p_query3 = $this->db->prepare("UPDATE participants SET study_group = :sg WHERE participant_id = :pid");
            $p_query3->bindParam(':pid', $participant->participant_id);
            $p_query3->bindParam(':sg', $sg);
            $p_query3->execute();

        $response->write('{"result": '.json_encode($sg).'}');
        return $response;        
    } 

    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->post('/savePersuasionProfile', function (Request $request, Response $response) {
    // Retrieve parameters (POST values)
    $vals = json_decode($request->getBody(), true);

    try 
    {
        // Find participant matching the token
        $p_query = $this->db->prepare("SELECT * FROM participants WHERE unique_token = :token");
        $p_query->bindParam(':token', $vals['token']);
        $p_query->execute();
 
        $participant = $p_query->fetch(PDO::FETCH_OBJ);
        
        if (!$participant) {
            return $response->write('{"error":{"text": "NO_PARTICIPANT"}}');
        }

        // See if a previous response exists
        $er_query = $this->db->prepare("SELECT * FROM persuasion_profile WHERE participant_id = :pid");
        $er_query->bindParam(':pid', $participant->participant_id);
        $er_query->execute();

        $existingresponse = $er_query->fetch(PDO::FETCH_OBJ);

        if ($existingresponse) {
            $r_query = $this->db->prepare("UPDATE persuasion_profile SET consensus_score = :c1, authority_score = :a, likability_score = :l, reciprocity_score = :r, scarcity_score = :s, commitment_score = :c2 WHERE participant_id = :pid");
            $r_query->bindParam(':pid', $participant->participant_id);
            $r_query->bindParam(':c1', $vals['profile']['consensus']);
            $r_query->bindParam(':a', $vals['profile']['authority']);
            $r_query->bindParam(':l', $vals['profile']['likability']);
            $r_query->bindParam(':r', $vals['profile']['reciprocity']);
            $r_query->bindParam(':s', $vals['profile']['scarcity']);
            $r_query->bindParam(':c2', $vals['profile']['commitment']);
            $r_query->execute();            
            $response->write('{"return": "UPDATED"}');
        }

        else {
            // Add the response to this participant
            $r_query = $this->db->prepare("INSERT INTO persuasion_profile(participant_id, consensus_score, authority_score, likability_score, reciprocity_score, scarcity_score, commitment_score) VALUES(:pid, :c1, :a, :l, :r, :s, :c2)");
            $r_query->bindParam(':pid', $participant->participant_id);
            $r_query->bindParam(':c1', $vals['profile']['consensus']);
            $r_query->bindParam(':a', $vals['profile']['authority']);
            $r_query->bindParam(':l', $vals['profile']['likability']);
            $r_query->bindParam(':r', $vals['profile']['reciprocity']);
            $r_query->bindParam(':s', $vals['profile']['scarcity']);
            $r_query->bindParam(':c2', $vals['profile']['commitment']);
            $r_query->execute();
            $response->write('{"return": "OK"}');
        }

        return $response;        
    }

    catch(PDOException $e) {
        return $response->write('{"error":{"text": "'. $e->getMessage() .'"}}');
    }
});

$app->run();

?>