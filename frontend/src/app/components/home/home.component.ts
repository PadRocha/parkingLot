import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
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
import { Lote } from 'src/app/models/lote';
declare let alertify: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
  // imports: [FormsModule]
})
export class HomeComponent implements OnInit {
  /*------------------------------------------------------------------*/
  // Object Arrays
  /*------------------------------------------------------------------*/

  public lotes: Array<Lote>;
  public registros: Array<Registro>;

  /*------------------------------------------------------------------*/
  // Forms
  /*------------------------------------------------------------------*/

  public cliente: Cliente;
  public vehiculo: Vehiculo;
  public registro: Registro;
  public subscripcion: Subscripcion;

  /*------------------------------------------------------------------*/
  // Variables
  /*------------------------------------------------------------------*/

  public closeResult: String; //* Mensaje de cierre Modal
  public myInnerHeight: Number = window.innerHeight - (window.innerHeight * .30); //* Tamaño de tabla
  public isMenuCollapsed: Boolean = true; //* Toogle Navbar
  public objectKeys = Object.keys;
  public times: Object;

  /*------------------------------------------------------------------*/
  // Variables Cámara
  /*------------------------------------------------------------------*/

  public showWebcam: boolean;
  public multipleWebcamsAvailable: boolean = false;
  public errorsCamera: WebcamInitError[] = [];
  public webcamImage: WebcamImage = null;
  public errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();

  /*------------------------------------------------------------------*/
  // Constructor
  /*------------------------------------------------------------------*/

  constructor(
    private _modalService: NgbModal,
    // private _router: ActivatedRoute,
    private _arrivalService: ArrivalsService,
    private _shippingService: ShippingService,
    private _auth: AuthService
  ) {
    this.cliente = new Cliente('', '', '', '', 'CURP', '', '');
    this.vehiculo = new Vehiculo(undefined, '', '', '', '#000000', '');
    this.registro = new Registro(undefined, '');
    this.subscripcion = new Subscripcion(undefined, '', 1, '');
    this.times = { hours: 'Hora', days: 'Días', weeks: 'Semanas', months: 'Meses', years: 'Años' };
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
    this.getLotes();
    this.getRegistros();
  }

  /*------------------------------------------------------------------*/
  // Charge on initial
  /*------------------------------------------------------------------*/

  private getLotes(): void {
    this._arrivalService.getLotes().subscribe(
      res => {
        if (res.data) {
          this.lotes = res.data;
        }
      },
      err => {
        this._auth.verify(err);
        console.log(<any>err);

      }
    );
  }

  private getRegistros(): void {
    this._arrivalService.getRegistros().subscribe(
      res => {
        if (res.data) {
          this.registros = res.data;
        }
      },
      err => {
        this._auth.verify(err);
        console.log(<any>err);

      }
    );
  }

  /*------------------------------------------------------------------*/
  // Functions
  /*------------------------------------------------------------------*/

  private padZero(str, len = 2) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

  public invertHex(hex, bw) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    let r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      // http://stackoverflow.com/a/3943023/112731
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? '#000000'
        : '#FFFFFF';
    }
    // invert color components
    let rn = (255 - r).toString(16),
      gn = (255 - g).toString(16),
      bn = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + this.padZero(rn) + this.padZero(gn) + this.padZero(bn);
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
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

  public openCliente(clienteModal): void { //* Configura el modal especial del cliente
    this.showWebcam = true;
    this.webcamImage = null;
    this.open(clienteModal);
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

  private turnToFile(): Blob { //* Convierte la imagen a Blob
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

  public onSubmitRegistro(form): void {
    this._shippingService.sendSubscripcion(this.subscripcion).subscribe(
      res => {
        alertify.alert().setting({
          'title': 'Supscripción guardada',
          'label': 'Ok',
          'message': `Subscripción >${res.data._id} ha sido guardada`,
          'onok': function () { alertify.success('Great'); }
        }).show();
        form.reset();
        // console.log(res);
      },
      err => {
        this._auth.verify(err);
        alertify.alert().setting({
          'title': 'Supscripción no guardada',
          'label': 'Ok',
          'message': `>${err.error.error}`,
          'onok': function () { alertify.error('Damn it'); }
        }).show();
        // console.log(<any>err);
      }
    );
  }

  public onSubmitCliente(form): void {
    this._shippingService.sendCliente(this.cliente, this.turnToFile()).subscribe(
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
    this._shippingService.sendVehiculo(this.vehiculo).subscribe(
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
    this._shippingService.sendSubscripcion(this.subscripcion).subscribe(
      res => {
        alertify.alert().setting({
          'title': 'Supscripción guardada',
          'label': 'Ok',
          'message': `Subscripción >${res.data._id} ha sido guardada`,
          'onok': function () { alertify.success('Great'); }
        }).show();
        form.reset();
        // console.log(res);
      },
      err => {
        this._auth.verify(err);
        alertify.alert().setting({
          'title': 'Supscripción no guardada',
          'label': 'Ok',
          'message': `>${err.error.error}`,
          'onok': function () { alertify.error('Damn it'); }
        }).show();
      }
    );
  }
}
