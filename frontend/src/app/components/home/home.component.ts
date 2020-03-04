import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { AuthService } from 'src/app/services/auth.service';
import { ShippingService } from 'src/app/services/shipping.service';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { Cliente } from 'src/app/models/cliente';
import { Vehiculo } from 'src/app/models/vehiculo';
import { Registro } from 'src/app/models/registro';
import { Subscripcion } from 'src/app/models/subscripcion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
  // imports: [FormsModule]
})
export class HomeComponent implements OnInit {
  /*------------------------------------------------------------------*/
  // Forms
  /*------------------------------------------------------------------*/

  public clientes: Cliente;
  public vehiculos: Vehiculo;
  public registros: Registro;
  public subscripcions: Subscripcion;

  /*------------------------------------------------------------------*/
  // Variables
  /*------------------------------------------------------------------*/

  public closeResult: String; //* Mensaje de cierre Modal
  public myInnerHeight: Number = window.innerHeight - (window.innerHeight * .30); //* Tamaño de tabla
  public isMenuCollapsed: Boolean = true; //* Toogle Navbar

  /*------------------------------------------------------------------*/
  // Variables Cámara
  /*------------------------------------------------------------------*/

  public showWebcam: Boolean;
  public multipleWebcamsAvailable: Boolean = false;
  public errorsCamera: WebcamInitError[] = [];
  public webcamImage: WebcamImage = null;
  public errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();

  /*------------------------------------------------------------------*/
  // Constructor
  /*------------------------------------------------------------------*/

  constructor(
    private _modalService: NgbModal,
    private _router: Router,
    private _shippingService: ShippingService,
    private _auth: AuthService
  ) {
    this.clientes = new Cliente('', '', '', '', 'CURP', '', '');
    this.vehiculos = new Vehiculo(undefined, '', '', '', '#000000', '');
    this.registros = new Registro(undefined, '');
    this.subscripcions = new Subscripcion(undefined, '', 1, '');
  }

  ngOnInit(): void {
    // console.log(this.colorDefault);
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  /*------------------------------------------------------------------*/
  // Funciones Modal
  /*------------------------------------------------------------------*/

  private getDismissReason(reason: any): string { //* Gestor de errores Modal
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public open(tarjet): void { //* Abre los Modals
    this._modalService.open(tarjet, { size: 'lg', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public openCliente(cliente): void { //* Configura el modal especial del cliente
    this.showWebcam = true;
    this.webcamImage = null;
    this.open(cliente);
  }

  /*------------------------------------------------------------------*/
  // Funciones cámara
  /*------------------------------------------------------------------*/

  public get triggerObservable(): Observable<void> { //* Permite la ejecición de la imagen
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void { //* Guarda la imagen en variable
    this.webcamImage = webcamImage;
  }

  public toggleWebcam(): void { //* Muestra la cámara - La oculta
    this.showWebcam = !this.showWebcam;
  }

  public triggerSnapshot(): void { //* Toma la foto de la cámara
    this.trigger.next();
    this.toggleWebcam();

  }

  public handleInitError(error: WebcamInitError): void { //* Gestor de errores de la cámara
    this.errorsCamera.push(error);
  }

  public turnToFile(): Blob { //* Convierte la imagen a Blob
    let byteString;
    if (this.webcamImage.imageAsDataUrl.split(',')[0].indexOf('base64') >= 0) byteString = atob(this.webcamImage.imageAsDataUrl.split(',')[1]);
    else byteString = unescape(this.webcamImage.imageAsDataUrl.split(',')[1]);
    let mimeString = this.webcamImage.imageAsDataUrl.split(',')[0].split(':')[1].split(';')[0];
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

  /*------------------------------------------------------------------*/
  // Submits
  /*------------------------------------------------------------------*/

  public onSubmitCliente(form): void {
    this._shippingService.sendCliente(this.clientes, this.turnToFile()).subscribe(
      res => {
        // console.log(res);
        this.webcamImage = null;
        form.reset();
        this.toggleWebcam();
      },
      err => {
        this._auth.verify(err);
        console.log(<any>err);
      }
    );
  }

  public onSubmitVehiculo(form): void {
    this._shippingService.sendVehiculo(this.vehiculos).subscribe(
      res => {
        form.reset();
        console.log(res);
      },
      err => {
        this._auth.verify(err);
        console.log(<any>err);
      }
    );
  }

  public onSubmitSubscripcion(form): void {
    this._shippingService.sendSubscripcion(this.subscripcions).subscribe(
      res => {
        form.reset();
        console.log(res);
      },
      err => {
        this._auth.verify(err);
        console.log(<any>err);
      }
    );
  }
}
