//
//  ItemsTableViewController.swift
//  TestREST
//
//  Created by Vladimir Nevinniy on 10/19/18.
//  Copyright © 2018 Vladimir Nevinniy. All rights reserved.
//

import UIKit
import Alamofire



class ItemsTableViewController: UITableViewController {
    
    
    struct Item {
        var id: Int = 0
        var user_id: Int = 0
        var title: String = ""
        var description: String = ""
        var image: UIImage?
    }
    
    
    var items = [Item]()
    
    
    let app =  (UIApplication.shared.delegate as! AppDelegate)

    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard let token = app.token else {
            return
        }
        
        let params: [String: Any] = [
            "title": "",
            "user_id": "",
            "order_by": "",
            "order_type": ""
            
        ]
        
        let headers = HTTPHeaders(dictionaryLiteral: ("authorization", token))

        request("http://10.0.1.5:3000/api/item", parameters: params, headers: headers).validate().responseJSON { responseJSON in
            
            switch responseJSON.result {
            case .success(let value):
                guard let jsonArray = value as? Array<[String: Any]> else { return }

                for jsonObject in jsonArray {
                    guard
                        let id = jsonObject["id"] as? Int,
                        let user_id = jsonObject["user_id"] as? Int,
                        let title = jsonObject["title"] as? String,
                        let description = jsonObject["description"] as? String,
                        let imagePath = jsonObject["image"] as? String
                        else {
                            return
                    }
                    
                    var item = Item(id: id, user_id: user_id, title: title, description: description, image: nil)
                    
                    if imagePath != "" {
                        let url = URL(string: imagePath)
                        if let data = try? Data(contentsOf: url!) {
                           item.image = UIImage(data: data)
                        }
                       
                    }
                    
                    self.items.append(item)
                }
                
                self.tableView.reloadData()
                
            case .failure(let error):
                print(error)
            }
        }
        
    }
    
   

    // MARK: - Table view data source

   

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return  items.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! ItemTableViewCell
        
        let item = items[indexPath.row]
        
        
        cell.titleMy.text = item.title
        cell.descriptionMy.text = item.description
        cell.imageMy.image = item.image

        return cell
    }
 

    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        return true
    }
    
    
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            
            
            guard let token = app.token else {
                return
            }
            
            let idItem  = items[indexPath.row].id
            
            let headers = HTTPHeaders(dictionaryLiteral: ("authorization", token))
            
            request("http://10.0.1.5:3000/api/item/\(idItem)", method: .delete, parameters: nil, headers: headers)
            
            items.remove(at: indexPath.row)
                
            tableView.beginUpdates()
            tableView.deleteRows(at: [indexPath], with: .automatic)
            tableView.endUpdates()
                
           
            
        }
    }
}
