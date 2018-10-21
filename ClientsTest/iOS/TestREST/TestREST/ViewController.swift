//
//  ViewController.swift
//  TestREST
//
//  Created by Vladimir Nevinniy on 10/19/18.
//  Copyright © 2018 Vladimir Nevinniy. All rights reserved.
//

import UIKit
import Alamofire

class ViewController: UIViewController {

    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var password: UITextField!
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func onClickLogin(_ sender: UIButton) {
        
        let params: [String: Any] = [
            "email": email.text!,
            "password": password.text!,
        ]
        
    
        
        request("http://10.0.1.5:3000/api/login", method: .post, parameters: params).validate().responseJSON { responseJSON in
            
            switch responseJSON.result {
            case .success(let value):
                if let jsonObject = value as? [String: Any] {
                    let app =  (UIApplication.shared.delegate as! AppDelegate)
                    app.token = jsonObject["token"] as? String
                    
                    self.performSegue(withIdentifier: "loginOk", sender: self)
                    
                }
            case .failure(let error):
                print(error)
            }
            
        }
        
        
    }
    
}

